// Copies relationship data from data/relationship-data.csv into the model.
//
// The CSV is the source of truth (ADR 0005). Each row's values become a table headed
// "Relationship data" in that relationship's description. Never edit those tables by
// hand: the next run overwrites them, and prints what it replaced.
//
// Usage:
//   node scripts/sync-relationship-data.mjs            update the .c4 files
//   node scripts/sync-relationship-data.mjs --watch    keep them updated as the CSV is saved
//   node scripts/sync-relationship-data.mjs --check    change nothing; fail if out of sync

import { readFileSync, readdirSync, statSync, watch, writeFileSync } from 'node:fs'
import { basename, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const csvFile = join(root, 'data', 'relationship-data.csv')
const modelDir = join(root, 'model')

// These hold no relationships that can carry data
const skippedFiles = new Set(['specification.c4', 'styles.c4', 'deployment.c4'])

const BLOCK_HEADING = '**Relationship data**'
const KEY_COLUMNS = ['source', 'kind', 'target']
const NUMERIC_COLUMNS = [
  'transactionVolume',
  'feePercentage',
  'feeAmountGbp',
  'averageValueGbp',
  'shareOfOrdersPercentage'
]
const COLUMNS = [
  ...KEY_COLUMNS,
  'transactionVolume',
  'transactionUnit',
  'transactionPeriod',
  'feePercentage',
  'feeAmountGbp',
  'feeUnit',
  'averageValueGbp',
  'shareOfOrdersPercentage',
  'frequency',
  'dataSource'
]

// A problem with the data that the person editing it needs to fix
class DataError extends Error {}

// ---- Reading the CSV ----

function parseCsv(text) {
  const input = text.replace(/^﻿/, '') // Excel's "CSV UTF-8" starts with a byte order mark
  const records = []
  let record = []
  let field = ''
  let quoted = false
  for (let i = 0; i < input.length; i++) {
    const c = input[i]
    if (quoted) {
      if (c === '"' && input[i + 1] === '"') {
        field += '"'
        i++
      } else if (c === '"') {
        quoted = false
      } else {
        field += c
      }
    } else if (c === '"') {
      quoted = true
    } else if (c === ',') {
      record.push(field)
      field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && input[i + 1] === '\n') i++
      record.push(field)
      records.push(record)
      record = []
      field = ''
    } else {
      field += c
    }
  }
  if (field !== '' || record.length > 0) {
    record.push(field)
    records.push(record)
  }
  return records
}

const keyOf = ({ source, kind, target }) => `${source} -[${kind}]-> ${target}`

function readRows() {
  const [header = [], ...records] = parseCsv(readFileSync(csvFile, 'utf8'))
  const columns = header.map(column => column.trim())
  const problems = []

  const unknown = columns.filter(column => !COLUMNS.includes(column))
  const missing = COLUMNS.filter(column => !columns.includes(column))
  if (unknown.length) problems.push(`Unknown columns: ${unknown.join(', ')}`)
  if (missing.length) problems.push(`Missing columns: ${missing.join(', ')}`)
  if (problems.length) throw new DataError(problems.join('\n'))

  const rows = new Map()
  records.forEach((record, index) => {
    if (record.every(field => field.trim() === '')) return
    const line = index + 2
    const row = Object.fromEntries(columns.map((column, i) => [column, (record[i] ?? '').trim()]))
    const key = keyOf(row)
    if (KEY_COLUMNS.some(column => !row[column])) {
      problems.push(`Line ${line}: source, kind and target are all required`)
      return
    }
    if (rows.has(key)) problems.push(`Line ${line}: a second row for ${key}`)
    for (const column of NUMERIC_COLUMNS) {
      row[column] = row[column].replaceAll(',', '')
      if (row[column] && !/^\d+(\.\d+)?$/.test(row[column])) {
        problems.push(`Line ${line}: ${column} must be a plain number, not "${row[column]}"`)
      }
    }
    if (row.transactionVolume && !row.transactionUnit) {
      problems.push(`Line ${line}: transactionVolume needs a transactionUnit`)
    }
    rows.set(key, row)
  })
  if (problems.length) throw new DataError(problems.join('\n'))
  return rows
}

// ---- What a row looks like in a description ----

const formatNumber = value => Number(value).toLocaleString('en-GB', { maximumFractionDigits: 6 })
const capitalise = text => text.charAt(0).toUpperCase() + text.slice(1)
const perPeriod = period => (period ? ` ${/^(hour|[aeiou])/i.test(period) ? 'an' : 'a'} ${period}` : '')

function measuresOf(row) {
  const measures = []
  if (row.transactionVolume) {
    const volume = `${formatNumber(row.transactionVolume)} ${row.transactionUnit}`
    measures.push(['Transaction volume', volume + perPeriod(row.transactionPeriod)])
  }
  if (row.feePercentage) measures.push(['Fee percentage', `${row.feePercentage}%`])
  if (row.feeAmountGbp) {
    const unit = row.feeUnit ? ` ${row.feeUnit}` : ''
    measures.push(['Fee amount (GBP)', `£${formatNumber(row.feeAmountGbp)}${unit}`])
  }
  if (row.averageValueGbp) measures.push(['Average value (GBP)', `£${formatNumber(row.averageValueGbp)}`])
  if (row.shareOfOrdersPercentage) measures.push(['Share of orders', `${row.shareOfOrdersPercentage}%`])
  if (row.frequency) measures.push(['Frequency', capitalise(row.frequency)])
  if (measures.length > 0 && row.dataSource) measures.push(['Data source', row.dataSource])
  return measures
}

const renderBlock = measures => [
  BLOCK_HEADING,
  '',
  '| Measure | Value |',
  '| --- | --- |',
  ...measures.map(([label, value]) => `| ${label} | ${value} |`)
]

// ---- Finding relationships in the .c4 files ----

function modelFiles(dir = modelDir) {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return modelFiles(path)
    return name.endsWith('.c4') && !skippedFiles.has(name) ? [path] : []
  })
}

const STATEMENT =
  /^([ \t]*)([\w.-]+)[ \t]+-\[(\w+)\]->[ \t]+([\w.-]+)(?:[ \t]+(?:'[^'\n]*'|"[^"\n]*"))?[ \t]*(\{)?[ \t]*$/gm

function stringEnd(text, start) {
  const quote = text[start]
  const triple = quote.repeat(3)
  if (text.startsWith(triple, start)) {
    const close = text.indexOf(triple, start + 3)
    if (close < 0) throw new Error('Unclosed string')
    return close + 3
  }
  for (let i = start + 1; i < text.length; i++) {
    if (text[i] === '\\') i++
    else if (text[i] === quote) return i + 1
  }
  throw new Error('Unclosed string')
}

// Walks a relationship's body, skipping strings and comments
function scanBody(text, open) {
  const body = { close: -1, description: null, insertAt: -1 }
  let depth = 0
  let i = open
  while (i < text.length) {
    const c = text[i]
    if (text.startsWith('//', i)) {
      const end = text.indexOf('\n', i)
      i = end < 0 ? text.length : end
    } else if (text.startsWith('/*', i)) {
      i = text.indexOf('*/', i) + 2
    } else if (c === "'" || c === '"') {
      i = stringEnd(text, i)
    } else if (c === '{') {
      depth++
      i++
    } else if (c === '}') {
      depth--
      if (depth === 0) {
        body.close = i
        return body
      }
      i++
    } else if (depth === 1 && /[a-z]/i.test(c) && !/[\w#.-]/.test(text[i - 1])) {
      const word = /^[\w-]+/.exec(text.slice(i, i + 40))[0]
      if (word === 'description') {
        const space = /^description\s+/.exec(text.slice(i, i + 40))[0]
        const start = i + space.length
        const end = stringEnd(text, start)
        body.description = { start: i, stringStart: start, end }
        i = end
      } else {
        if (body.insertAt < 0 && ['metadata', 'link', 'navigateTo', 'style'].includes(word)) body.insertAt = i
        i += word.length
      }
    } else {
      i++
    }
  }
  throw new Error('Unclosed relationship body')
}

function descriptionLines(text, description) {
  const { stringStart, end } = description
  const size = text.startsWith(text[stringStart].repeat(3), stringStart) ? 3 : 1
  const [first, ...rest] = text.slice(stringStart + size, end - size).split('\n')
  const indents = rest.filter(line => line.trim()).map(line => /^[ \t]*/.exec(line)[0].length)
  const indent = indents.length ? Math.min(...indents) : 0
  const lines = [first.trim(), ...rest.map(line => line.slice(indent).trimEnd())]
  while (lines.length && !lines[0]) lines.shift()
  while (lines.length && !lines.at(-1)) lines.pop()
  return lines
}

// Splits description lines into the generated block's measures and everything else
function splitBlock(lines) {
  const heading = lines.indexOf(BLOCK_HEADING)
  if (heading < 0) return { measures: [], rest: lines }
  let end = heading + 1
  while (end < lines.length && !lines[end]) end++
  const tableStart = end
  while (end < lines.length && lines[end].startsWith('|')) end++
  const measures = lines
    .slice(tableStart + 2, end)
    .map(line => line.split('|').slice(1, -1).map(cell => cell.trim()))
  while (end < lines.length && !lines[end]) end++
  return { measures, rest: [...lines.slice(0, heading), ...lines.slice(end)] }
}

// The table goes after any wording and before any schema
function insertBlock(rest, block) {
  const schema = rest.findIndex(line => /^\*\*(Example|Proposed) schema/.test(line))
  if (schema >= 0) return [...rest.slice(0, schema), ...block, '', ...rest.slice(schema)]
  return rest.length ? [...rest, '', ...block] : block
}

function renderDescription(lines, indent) {
  const content = lines.map(line => (line ? `${indent}  ${line}` : '')).join('\n')
  return `${indent}description '''\n${content}\n${indent}'''`
}

const lineStart = (text, index) => text.lastIndexOf('\n', index - 1) + 1

// ---- Working out and applying the changes ----

function planFile(text, rows, usedKeys) {
  const edits = []
  const changes = []
  for (const match of text.matchAll(STATEMENT)) {
    const [statement, indent, source, kind, target, open] = match
    const key = keyOf({ source, kind, target })
    const row = rows.get(key)
    if (row) usedKeys.add(key)

    const propertyIndent = `${indent}  `
    const body = open ? scanBody(text, match.index + statement.lastIndexOf('{')) : null
    const description = body?.description ?? null
    const current = description ? descriptionLines(text, description) : []
    const { measures: before, rest } = splitBlock(current)
    const after = row ? measuresOf(row) : []
    if (JSON.stringify(before) === JSON.stringify(after)) continue

    changes.push({ key, before, after })
    const lines = after.length ? insertBlock(rest, renderBlock(after)) : rest

    if (!body) {
      const end = match.index + statement.length
      edits.push({ start: end, end, text: ` {\n${renderDescription(lines, propertyIndent)}\n${indent}}` })
    } else if (description && lines.length) {
      const start = lineStart(text, description.start)
      edits.push({ start, end: description.end, text: renderDescription(lines, propertyIndent) })
    } else if (description) {
      // Nothing left to say: remove the description, and the body if it is now empty
      const start = lineStart(text, description.start)
      const end = text.indexOf('\n', description.end) + 1
      const open = match.index + statement.lastIndexOf('{')
      const emptied = !(text.slice(open + 1, start) + text.slice(end, body.close)).trim()
      edits.push(
        emptied
          ? { start: text.slice(0, open).trimEnd().length, end: body.close + 1, text: '' }
          : { start, end, text: '' }
      )
    } else {
      const at = lineStart(text, body.insertAt >= 0 ? body.insertAt : body.close)
      edits.push({ start: at, end: at, text: `${renderDescription(lines, propertyIndent)}\n` })
    }
  }
  const updated = edits
    .sort((a, b) => b.start - a.start)
    .reduce((result, edit) => result.slice(0, edit.start) + edit.text + result.slice(edit.end), text)
  return { updated, changes }
}

function plan(rows) {
  const usedKeys = new Set()
  const files = modelFiles().map(path => {
    const raw = readFileSync(path, 'utf8')
    const eol = raw.includes('\r\n') ? '\r\n' : '\n'
    const text = raw.replaceAll('\r\n', '\n')
    const { updated, changes } = planFile(text, rows, usedKeys)
    return { path, changes, output: changes.length ? updated.replaceAll('\n', eol) : null }
  })
  const unknown = [...rows.keys()].filter(key => !usedKeys.has(key))
  if (unknown.length) {
    throw new DataError(
      `These rows point at relationships that are not in the model, so nothing was changed. ` +
        `Add the relationship to a .c4 file first, or fix the row:\n  ${unknown.join('\n  ')}`
    )
  }
  return files
}

function describe({ key, before, after }) {
  const was = new Map(before)
  const now = new Map(after)
  const lines = [...new Set([...was.keys(), ...now.keys()])].flatMap(label => {
    if (was.get(label) === now.get(label)) return []
    if (!was.has(label)) return [`    + ${label}: ${now.get(label)}`]
    if (!now.has(label)) return [`    - ${label}: ${was.get(label)}`]
    return [`    ${label}: ${was.get(label)} -> ${now.get(label)}`]
  })
  return `  ${key}\n${lines.join('\n')}`
}

function sync({ check }) {
  const files = plan(readRows())
  const changed = files.filter(file => file.changes.length)
  const count = changed.reduce((total, file) => total + file.changes.length, 0)
  if (count === 0) {
    console.log('In sync: the model matches data/relationship-data.csv')
    return true
  }
  for (const file of changed) {
    console.log(relative(root, file.path).replaceAll('\\', '/'))
    file.changes.forEach(change => console.log(describe(change)))
  }
  const relationships = `${count} ${count === 1 ? 'relationship' : 'relationships'}`
  if (check) {
    console.error(
      `Out of sync: ${relationships} differ from data/relationship-data.csv. ` +
        `Run node scripts/sync-relationship-data.mjs to update the model.`
    )
    return false
  }
  changed.forEach(file => writeFileSync(file.path, file.output))
  console.log(`Updated ${relationships} in ${changed.length} ${changed.length === 1 ? 'file' : 'files'}`)
  return true
}

// ---- Running it ----

function report(error) {
  if (error instanceof DataError) console.error(error.message)
  else if (['EBUSY', 'EPERM', 'EACCES'].includes(error.code)) console.error(`Could not read the CSV, is it locked? ${error.message}`)
  else throw error
}

const args = process.argv.slice(2)
const unknownArgs = args.filter(arg => !['--watch', '--check'].includes(arg))
if (unknownArgs.length || args.length > 1) {
  console.error('Usage: node scripts/sync-relationship-data.mjs [--watch | --check]')
  process.exit(2)
}

if (args[0] === '--watch') {
  const runSafely = () => {
    try {
      sync({ check: false })
    } catch (error) {
      report(error)
    }
  }
  runSafely()
  console.log('Watching data/relationship-data.csv. Press Ctrl+C to stop.')
  let timer
  // Watch the folder: spreadsheet apps often save by replacing the file
  watch(dirname(csvFile), (_event, name) => {
    if (name !== basename(csvFile)) return
    clearTimeout(timer)
    timer = setTimeout(runSafely, 300)
  })
} else {
  try {
    process.exitCode = sync({ check: args[0] === '--check' }) ? 0 : 1
  } catch (error) {
    report(error)
    process.exitCode = 2
  }
}
