// Asks for the shared password before Cloudflare Pages serves anything. Pages runs
// this file on every request, static files included, on every deployment's URL.
//
// The password is the SITE_PASSWORD secret, which never goes in this repo. Any username
// is accepted, so visitors only have one thing to get right. If the secret is missing,
// the site stays shut rather than opening to everyone.

const encoder = new TextEncoder()
const sha256 = text => crypto.subtle.digest('SHA-256', encoder.encode(text))

// Browsers send "Authorization: Basic <base64 of username:password>"
const passwordFrom = request => {
  const match = /^Basic\s+(\S+)$/i.exec(request.headers.get('Authorization') ?? '')
  if (!match) return null
  try {
    const bytes = Uint8Array.from(atob(match[1]), char => char.charCodeAt(0))
    const credentials = new TextDecoder().decode(bytes)
    const colon = credentials.indexOf(':')
    return colon === -1 ? null : credentials.slice(colon + 1)
  } catch {
    return null
  }
}

// Hashing first gives both sides the same length, which timingSafeEqual requires
const matches = async (given, expected) =>
  crypto.subtle.timingSafeEqual(await sha256(given), await sha256(expected))

export async function onRequest({ request, env, next }) {
  if (!env.SITE_PASSWORD) {
    return new Response('The site password has not been set.', { status: 503 })
  }

  const given = passwordFrom(request)
  if (given !== null && (await matches(given, env.SITE_PASSWORD))) return next()

  return new Response('This site needs a password.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Food delivery demo", charset="UTF-8"' }
  })
}
