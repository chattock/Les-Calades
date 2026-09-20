/* a small reader and writer for the calendars Airbnb exchanges: all-day events only */
const unfold = (text) => text.replace(/\r?\n[ \t]/g, '');
const ymd = (v) => (v && /^\d{8}/.test(v) ? `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}` : null);

/** [{a, b, summary}] from an iCal text, b exclusive as in the file */
export function parseIcal(text) {
  const out = [];
  for (const block of unfold(text).split('BEGIN:VEVENT').slice(1)) {
    const body = block.split('END:VEVENT')[0];
    const get = (name) => { const m = body.match(new RegExp(`^${name}[^:]*:(.*)$`, 'm')); return m ? m[1].trim() : null; };
    const a = ymd(get('DTSTART')), b = ymd(get('DTEND')), summary = get('SUMMARY') || '';
    if (a && b && b > a) out.push({ a, b, summary });
  }
  return out;
}

const compact = (s) => s.replace(/-/g, '');
const esc = (s) => String(s).replace(/([,;\\])/g, '\\$1');
/** an iCal text of all-day events, one per private stay */
export function buildIcal(events, name) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Les Calades//calendar//FR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', `X-WR-CALNAME:${esc(name)}`];
  for (const e of events) {
    lines.push('BEGIN:VEVENT', `UID:${e.id}@lescalades`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${compact(e.a)}`, `DTEND;VALUE=DATE:${compact(e.b)}`, `SUMMARY:${esc(e.summary)}`, 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}
