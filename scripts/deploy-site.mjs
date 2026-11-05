// Builds the demo as a static site and publishes it to Cloudflare Pages, behind the
// shared password in site/functions/_middleware.js. First-time setup is in the README.
//
// Usage:
//   node scripts/deploy-site.mjs             checks, builds and publishes
//   node scripts/deploy-site.mjs --preview   checks, builds and serves it locally at
//                                            http://localhost:8788 (password: preview)
//
// The site is put together in dist/site, and only that folder is uploaded. Never upload
// dist/ itself: it also holds playground builds, which can include other models.

import { spawnSync } from 'node:child_process'
import { existsSync, cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteFiles = join(root, 'site')
const out = join(root, 'dist', 'site')

const projectName = 'food-delivery-demo'
const wrangler = 'npx --yes wrangler@4'

// What must never reach the site: the name of the real subject of this method and its
// sector, which this branch leaves out on purpose, and the owner named in backlog files.
// The first is written with a character class so that the word stays off this branch too.
const forbidden = [/\bID[C]C\b/, /\bhousing\b/i, /Novais/]

const fail = message => {
  console.error(`\n${message}`)
  process.exit(1)
}

const run = (command, { cwd = root, capture = false } = {}) => {
  const result = spawnSync(command, {
    cwd,
    shell: true,
    encoding: 'utf8',
    stdio: capture ? ['inherit', 'pipe', 'inherit'] : 'inherit',
    env: { ...process.env, WRANGLER_SEND_METRICS: 'false' }
  })
  if (capture) process.stdout.write(result.stdout ?? '')
  if (result.status !== 0) fail(`Stopped, because this command failed:\n  ${command}`)
  return result.stdout
}

const filesIn = dir =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => join(entry.parentPath, entry.name))

const build = () => {
  rmSync(out, { recursive: true, force: true })

  // --output-single-file because the normal build fails on Windows with LikeC4 1.60.
  // It also gives /#/ URLs, so a link to any view works without server routing.
  const title = '"Food Delivery Reference Architecture"'
  run(`likec4 build -o dist/site/map --output-single-file --base /map/ --title ${title} .`)

  // Pages treats the nearest 404.html as the not-found page, so the app's copy must go
  rmSync(join(out, 'map', '404.html'), { force: true })

  for (const name of ['index.html', '404.html', '_headers']) {
    cpSync(join(siteFiles, name), join(out, name))
  }

  // The questions and assumptions that elements link to, without the owner's name
  for (const folder of ['questions', 'assumptions']) {
    mkdirSync(join(out, 'backlog', folder), { recursive: true })
    for (const name of readdirSync(join(root, 'backlog', folder))) {
      const text = readFileSync(join(root, 'backlog', folder, name), 'utf8')
      writeFileSync(join(out, 'backlog', folder, name), text.replace(/^- Owner:.*\r?\n/m, ''))
    }
  }
}

const checkOutput = () => {
  const problems = []

  for (const file of filesIn(out)) {
    const text = readFileSync(file, 'utf8')
    for (const word of forbidden) {
      if (word.test(text)) problems.push(`${relative(out, file)} contains ${word}`)
    }
  }

  // Relative links resolve to the site's root, so each must be there
  const sources = [...filesIn(join(root, 'model')), ...filesIn(join(root, 'views'))].filter(f => f.endsWith('.c4'))
  for (const file of sources) {
    for (const [, target] of readFileSync(file, 'utf8').matchAll(/^\s*link\s+(?:\.\.\/)+(\S+)/gm)) {
      if (!existsSync(join(out, target))) problems.push(`${relative(root, file)} links to ${target}, which is not published`)
    }
  }

  // The start page links to views by id, so a renamed view would break its route
  const model = sources.map(file => readFileSync(file, 'utf8')).join('\n')
  for (const [, id] of readFileSync(join(siteFiles, 'index.html'), 'utf8').matchAll(/map\/#\/view\/(\w+)\//g)) {
    if (!new RegExp(`\\bview ${id}\\b`).test(model)) problems.push(`site/index.html links to view ${id}, which does not exist`)
  }

  if (problems.length) fail(`Nothing was published:\n  ${problems.join('\n  ')}`)
}

// Only a page served without the password counts as exposed. A new deployment's address can
// answer 404 for a few seconds before it is ready, so any other answer is tried again.
const confirmPasswordRequired = async url => {
  let status
  for (let attempt = 0; attempt < 12; attempt++) {
    status = await fetch(url).then(response => response.status, () => 'no response')
    if (status === 401) return console.log(`\nConfirmed: ${url} asks for the password.`)
    if (status === 503) {
      fail(`Published, but shut: the password is not set. Set it, then run this script again:\n  ${wrangler} pages secret put SITE_PASSWORD --project-name ${projectName}`)
    }
    if (status >= 200 && status < 300) {
      fail(`WARNING: PUBLISHED WITHOUT A PASSWORD. ${url} answered ${status} instead of 401. Delete this deployment in the Cloudflare dashboard.`)
    }
    await new Promise(resolve => setTimeout(resolve, 5000))
  }
  fail(`Published, but the password could not be confirmed: ${url} last answered ${status}. Open it yourself and check that it asks for the password.`)
}

run('node scripts/sync-relationship-data.mjs --check')
run('likec4 validate .')
build()
checkOutput()

if (process.argv.includes('--preview')) {
  run(`${wrangler} pages dev ../dist/site --port 8788 --binding SITE_PASSWORD=preview`, { cwd: siteFiles })
} else {
  // wrangler looks for functions/ in the folder it runs from, so it runs from site/
  const output = run(`${wrangler} pages deploy ../dist/site --project-name ${projectName} --branch main`, {
    cwd: siteFiles,
    capture: true
  })
  const url = output.match(/https:\/\/[\w.-]+\.pages\.dev/)?.[0]
  if (!url) fail('Published, but the URL was not in the output, so the password was not checked. Check it yourself.')
  await confirmPasswordRequired(url)
  console.log(`The link to share is https://${projectName}.pages.dev, unless Cloudflare gave the project a different address.`)
}
