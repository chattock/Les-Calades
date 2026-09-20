# Les Calades

The website for Les Calades, a village house with a pool in Lédenon (Gard). French first, every page also in English.

Built with [Astro](https://astro.build), hosted on Netlify.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321/
npm run build    # static site in dist/
npm run preview
```

## Where things are

- `src/pages/` (French, at the root) and `src/pages/en/`: one file per page and language, each just mounts a component with its `lang`.
- `src/components/`: the home page sections (Hero, Cards, Features, Reviews, Host, Faq, Footer, Lightbox), the House, Area and Practical pages, the booking Calendar, and the Booking and Owner pages.
- `src/i18n.ts`: page URLs per language and the `t('français', 'English')` helper used everywhere.
- `src/styles/global.css`: every shared style; `pages.css`: the house, area and practical pages; `book.css`: the booking and owner pages.
- `netlify/functions/`: the three small server pieces (below), with shared code in `netlify/lib/`.
- `src/data/`: `pricelabs.json` (a year of nightly prices and minimum stays read from PriceLabs), `bookings.json` (booked and blocked dates), `galleries.json` (which photos each room opens), `marquee.json` (the room-by-room row).
- `public/img/`: the photos, numbered as in the original contact sheet.

## How booking works

Guests pick their dates on the site's calendar, which shows what is free and the minimum stay Airbnb applies to each check-in date, then a button opens the Airbnb listing with those dates and the party size filled in. Payment, deposit and cancellation stay on Airbnb.

## The calendar and the owner area

Three Netlify Functions do the live part; everything else is static.

- `GET /api/calendar`: what is booked or blocked. It reads the calendar Airbnb exports (the `AIRBNB_ICAL_URL` setting, re-read at most once an hour, last good copy kept if Airbnb is down) and adds the private stays. Without the setting it falls back to `src/data/bookings.json`.
- `GET|POST|DELETE /api/owner/stays`: the private stays, kept in Netlify Blobs. Needs `Authorization: Bearer <owner password>`.
- `GET /calendar.ics`: the feed to paste into Airbnb (Calendar → Connect calendars → Import). Every private stay closes its dates there at Airbnb's next import.

The owner page (`/proprietaire/`, `/en/owner/`) asks for the password, keeps it for the browser session, and sends it only to the site's own function. The page itself is static and holds nothing private.

Settings on Netlify (Site configuration → Environment variables), never in the code:

- `OWNER_PASSWORD`: the owner area password.
- `AIRBNB_ICAL_URL`: the export link from Airbnb (Calendar → Availability settings → Connect calendars → Export). Set on Netlify on 2026-09-20 as a secret for the production context (the connector only stores it when given one context). A change to it needs a new deploy before the function sees it.

To run the functions on a machine without Netlify, set `LC_LOCAL_STORE=<a directory>` and the stores become JSON files there.

## Still to come

- Minimum stays from PriceLabs on a schedule, instead of `src/data/pricelabs.json` refreshed at build time.
- Live rating and review count from Airbnb.
- The registration number (meublé de tourisme) in the footer. The domain is maisonlescalades.com (bought 2026-09-20, to be attached to the Netlify site under Domain management); once it resolves, set `site: 'https://maisonlescalades.com'` in `astro.config.mjs` for absolute hreflang links and re-paste the feed address in Airbnb.

## Temporary curtain

While the site is being finished, `netlify/edge-functions/gate.js` asks every visitor for the owner password (the `OWNER_PASSWORD` site setting) once and sets a 30-day cookie. `/calendar.ics` and `/api/*` stay open so the Airbnb sync keeps working. Delete that file and push to open the site.
