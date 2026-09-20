/* the owner's private stays: list, add, remove. Needs the owner password. */
import { readStays, writeStays, authorised, json, isDate } from '../lib/store.mjs';

export default async (req) => {
  if (!authorised(req)) return json({ error: 'unauthorised' }, 401);
  const list = await readStays();
  if (req.method === 'GET') return json({ stays: list });
  if (req.method === 'POST') {
    let body; try { body = await req.json(); } catch { return json({ error: 'bad json' }, 400); }
    const { a, b } = body, who = String(body.who || 'Laure').slice(0, 80);
    if (!isDate(a) || !isDate(b) || b <= a) return json({ error: 'bad dates' }, 400);
    const stay = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), a, b, who };
    list.push(stay); list.sort((x, y) => (x.a < y.a ? -1 : 1));
    await writeStays(list);
    return json({ stays: list, added: stay }, 201);
  }
  if (req.method === 'DELETE') {
    const id = new URL(req.url).searchParams.get('id');
    const next = list.filter((s) => s.id !== id);
    if (next.length === list.length) return json({ error: 'not found' }, 404);
    await writeStays(next);
    return json({ stays: next });
  }
  return json({ error: 'method' }, 405);
};
export const config = { path: '/api/owner/stays' };
