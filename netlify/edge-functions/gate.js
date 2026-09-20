// A temporary curtain over the whole site while it is being finished (james, 2026-09-20 20:03):
// every page asks for the owner password once, then a cookie lets the visitor through for 30 days.
// The Airbnb feed (/calendar.ics) and the API stay open so the calendar sync keeps working.
// Remove this file to open the site again.

const COOKIE = 'lc-entree';
const DAYS = 30;

const hex = (buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
const token = async (pw) => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode('les-calades|entree|' + pw)));

const page = (lang, wrong, next) => {
  const fr = lang !== 'en';
  const t = fr
    ? { title: 'Site en préparation', lede: 'Le site n’est pas encore ouvert. Entrez le mot de passe pour continuer.', label: 'Mot de passe', go: 'Entrer', wrong: 'Ce n’est pas le bon mot de passe.', other: 'English' }
    : { title: 'Site in preparation', lede: 'The site is not open yet. Enter the password to continue.', label: 'Password', go: 'Enter', wrong: 'That is not the right password.', other: 'Français' };
  const otherHref = fr ? '/en/' : '/';
  return `<!doctype html><html lang="${fr ? 'fr' : 'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Les Calades · ${t.title}</title>
<style>
:root{--cream:#F4F1E8;--olive:#2F4A1E;--ink:#3F3237}
html,body{margin:0;min-height:100%}
body{background:var(--cream);color:var(--ink);font-family:Poppins,system-ui,-apple-system,"Segoe UI",sans-serif;font-weight:300;display:grid;place-items:center;min-height:100vh;padding:1.5rem;box-sizing:border-box}
main{width:100%;max-width:22rem;text-align:center}
.brand{font-weight:800;font-size:1rem;letter-spacing:.02em;line-height:1.2;color:var(--olive);margin:0 0 2.2rem}
.brand span{display:block}
h1{font-weight:600;font-size:1.05rem;letter-spacing:.14em;text-transform:uppercase;color:var(--olive);margin:0 0 .8rem}
p{margin:0 0 1.4rem;line-height:1.6;font-size:.95rem}
label{display:block;text-align:left;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:var(--olive);margin-bottom:.4rem}
input{width:100%;box-sizing:border-box;font:inherit;font-size:1rem;padding:.7rem .9rem;border:1px solid var(--olive);border-radius:.4rem;background:#fff;color:var(--ink)}
input:focus{outline:2px solid var(--olive);outline-offset:2px}
button{margin-top:1rem;width:100%;font:inherit;font-weight:500;font-size:1rem;padding:.8rem;border:0;border-radius:999px;background:var(--olive);color:var(--cream);cursor:pointer}
.err{color:#8a2d1f;font-size:.9rem;margin:.8rem 0 0}
.lang{margin-top:2.2rem;font-size:.8rem}
.lang a{color:var(--olive)}
</style></head><body><main>
<p class="brand"><span>LES</span><span>CALADES</span></p>
<h1>${t.title}</h1>
<p>${t.lede}</p>
<form method="post" action="/__entree">
<input type="hidden" name="next" value="${next.replace(/"/g, '&quot;')}">
<label for="pw">${t.label}</label>
<input id="pw" name="pw" type="password" autocomplete="current-password" autofocus required>
<button type="submit">${t.go}</button>
${wrong ? `<p class="err">${t.wrong}</p>` : ''}
</form>
<p class="lang"><a href="${otherHref}">${t.other}</a></p>
</main></body></html>`;
};

const respond = (lang, wrong, next, status) =>
  new Response(page(lang, wrong, next), {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' },
  });

export default async (request, context) => {
  const want = Netlify.env.get('OWNER_PASSWORD') || '';
  if (!want) return context.next(); // no password configured: never lock everyone out

  const url = new URL(request.url);
  const expected = await token(want);
  const langOf = (p) => (p === '/en' || p.startsWith('/en/') ? 'en' : 'fr');

  if (request.method === 'POST' && url.pathname === '/__entree') {
    const form = await request.formData();
    const pw = String(form.get('pw') || '');
    let next = String(form.get('next') || '/');
    if (!next.startsWith('/') || next.startsWith('//')) next = '/';
    if (pw === want) {
      return new Response(null, {
        status: 303,
        headers: {
          location: next,
          'set-cookie': `${COOKIE}=${expected}; Path=/; Max-Age=${DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`,
          'cache-control': 'no-store',
        },
      });
    }
    return respond(langOf(next), true, next, 401);
  }

  const cookie = context.cookies.get(COOKIE);
  if (cookie === expected) return context.next();

  const next = url.pathname + url.search;
  return respond(langOf(url.pathname), false, next, 401);
};

export const config = {
  path: '/*',
  // the Airbnb feed and the API stay open: Airbnb reads /calendar.ics on its own, and the pages call /api/ with the cookie anyway
  excludedPath: ['/calendar.ics', '/api/*', '/.netlify/*'],
};
