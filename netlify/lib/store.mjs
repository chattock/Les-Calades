/* shared by the functions: where the private stays live, and who may change them */
import { getStore } from '@netlify/blobs';
import { timingSafeEqual } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

/* on Netlify the stores are Netlify Blobs; on a developer's machine, LC_LOCAL_STORE=<dir> keeps them as JSON files */
function localStore(name) {
  const dir = process.env.LC_LOCAL_STORE;
  const file = `${dir}/${name}.json`;
  const read = async () => { try { return JSON.parse(await readFile(file, 'utf8')); } catch { return {}; } };
  return {
    async get(key, opts) { const all = await read(); const v = all[key]; return v === undefined ? null : (opts && opts.type === 'json' ? v : JSON.stringify(v)); },
    async setJSON(key, value) { const all = await read(); all[key] = value; await mkdir(dir, { recursive: true }); await writeFile(file, JSON.stringify(all)); },
  };
}
const store = (name, opts) => (process.env.LC_LOCAL_STORE ? localStore(name) : getStore(opts ? { name, ...opts } : name));
export const stays = () => store('stays', { consistency: 'strong' });
export const cache = () => store('cache');

/** the private stays, oldest first: [{id, a, b, who}] with a and b as YYYY-MM-DD, b exclusive */
export async function readStays() {
  const list = await stays().get('list', { type: 'json' });
  return Array.isArray(list) ? list : [];
}
export async function writeStays(list) {
  await stays().setJSON('list', list);
}

/** the owner password lives in the OWNER_PASSWORD site setting, never in the code */
export function authorised(req) {
  const want = process.env.OWNER_PASSWORD || '';
  const got = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!want || !got) return false;
  const a = Buffer.from(want), b = Buffer.from(got);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...headers } });

export const isDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
