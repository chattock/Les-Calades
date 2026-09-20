/* the feed Airbnb imports: every private stay closes its dates there */
import { readStays } from '../lib/store.mjs';
import { buildIcal } from '../lib/ical.mjs';

export default async () => {
  const stays = await readStays();
  const body = buildIcal(stays.map((s) => ({ id: s.id, a: s.a, b: s.b, summary: 'Les Calades · séjour privé' })), 'Les Calades');
  return new Response(body, { status: 200, headers: { 'content-type': 'text/calendar; charset=utf-8', 'cache-control': 'public, max-age=900' } });
};
export const config = { path: '/calendar.ics' };
