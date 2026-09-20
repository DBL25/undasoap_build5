declare const Netlify: { env: { get: (name: string) => string | undefined } };

const encoder = new TextEncoder();

async function digest(value: string) {
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[character] || character));
}

function accessPage(message = '') {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>UNDA Workshop Access</title><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0a0a0a;color:#fff;font-family:Arial,sans-serif;padding:24px}.card{width:min(480px,100%);border:3px solid #c69a5f;padding:32px;background:#111;box-shadow:8px 8px 0 #c69a5f}small{color:#c69a5f;text-transform:uppercase;letter-spacing:.18em;font-weight:900}h1{font-size:38px;line-height:.95;text-transform:uppercase;margin:14px 0}p{color:#bbb;line-height:1.55;font-size:14px}label{display:block;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin:22px 0 7px}input{width:100%;padding:14px;border:2px solid #fff;background:#fff;color:#000;font-size:16px}button{width:100%;margin-top:10px;padding:15px;background:#c69a5f;color:#000;border:2px solid #c69a5f;font-weight:900;text-transform:uppercase;letter-spacing:.12em;cursor:pointer}.error{color:#ffb4b4;font-weight:700}.back{display:inline-block;margin-top:20px;color:#c69a5f;font-size:11px;font-weight:900;text-transform:uppercase;text-decoration:none}</style></head><body><main class="card"><small>Private Workshop Preview</small><h1>Enter The Shop.</h1><p>This demo is reserved for UNDA testers, collaborators, and early supporters.</p>${message ? `<p class="error">${escapeHtml(message)}</p>` : ''}<form method="post"><label for="password">Workshop password</label><input id="password" name="password" type="password" autocomplete="current-password" required autofocus><button type="submit">Unlock Demo</button></form><a class="back" href="/">← Back to prelaunch</a></main></body></html>`;
}

export default async (request: Request, context: { next: () => Promise<Response>; cookies: { get: (name: string) => string | undefined } }) => {
  const password = Netlify.env.get('UNDA_PREVIEW_PASSWORD');
  const sessionSecret = Netlify.env.get('UNDA_PREVIEW_SESSION_SECRET') || password;

  if (!password || !sessionSecret) {
    return new Response(accessPage('Early-access password setup is not complete yet.'), {
      status: 503,
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
    });
  }

  const expectedSession = await digest(`${password}:${sessionSecret}`);
  const cookieHeader = request.headers.get('cookie') || '';
  const sessionCookie = cookieHeader.split(';').map((item) => item.trim()).find((item) => item.startsWith('unda_preview_session='))?.split('=')[1];

  if (sessionCookie === expectedSession) {
    const response = await context.next();
    const headers = new Headers(response.headers);
    headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
    return new Response(response.body, { status: response.status, headers });
  }

  if (request.method === 'POST') {
    const form = await request.formData();
    const supplied = String(form.get('password') || '');
    if (supplied === password) {
      return new Response(null, {
        status: 303,
        headers: {
          location: new URL(request.url).pathname,
          'set-cookie': `unda_preview_session=${expectedSession}; Path=/preview; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`,
          'cache-control': 'no-store',
        },
      });
    }
    return new Response(accessPage('That workshop password is not correct.'), {
      status: 401,
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
    });
  }

  return new Response(accessPage(), {
    status: 401,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
};
