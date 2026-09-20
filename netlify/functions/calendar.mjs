/* what is booked or blocked, for the public calendar: Airbnb's own calendar plus the private stays */
import { readStays, cache, json } from '../lib/store.mjs';
import { parseIcal } from '../lib/ical.mjs';
import seed from '../../src/data/bookings.json' with { type: 'json' };

const HOUR = 60 * 60 * 1000;

/** Airbnb's exported calendar, re-read at most once an hour; the last good copy is kept if Airbnb is unreachable */
async function airbnbBlocks() {
  const url = process.env.AIRBNB_ICAL_URL;
  if (!url) return { configured: false, blocks: seed, at: null, ok: false };
  const store = cache();
  const cached = (await store.get('airbnb', { type: 'json' })) || null;
  if (cached && Date.now() - cached.at < HOUR) return { configured: true, ...cached, ok: true };
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'les-calades-site' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const blocks = parseIcal(await res.text()).map((e) => {
      const busy = /reserved/i.test(e.summary);
      return { a: e.a, b: e.b, src: 'air', who: busy ? 'Airbnb' : 'Airbnb · bloqué', whoEn: busy ? 'Airbnb' : 'Airbnb · blocked' };
    });
    const fresh = { at: Date.now(), blocks };
    await store.setJSON('airbnb', fresh);
    return { configured: true, ...fresh, ok: true };
  } catch (err) {
    return { configured: true, at: cached ? cached.at : null, blocks: cached ? cached.blocks : [], ok: false, error: String(err.message || err) };
  }
}

export default async () => {
  const [air, stays] = await Promise.all([airbnbBlocks(), readStays()]);
  const own = stays.map((s) => ({ id: s.id, a: s.a, b: s.b, src: 'own', who: s.who, whoEn: s.who }));
  /* Airbnb echoes our own feed back as "not available": keep those out so a private stay shows once */
  const inside = (x, y) => x.a >= y.a && x.b <= y.b;
  const blocks = air.blocks.filter((x) => !own.some((y) => inside(x, y))).concat(own).sort((x, y) => (x.a < y.a ? -1 : 1));
  return json({ blocks, airbnb: { configured: air.configured, ok: air.ok, at: air.at, error: air.error } }, 200, { 'cache-control': 'public, max-age=300' });
};
export const config = { path: '/api/calendar' };
