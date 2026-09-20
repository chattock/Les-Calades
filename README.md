# Les Calades

The website for Les Calades, a village house with a pool in Lédenon (Gard). French first, every page also in English.

Built with [Astro](https://astro.build), hosted on Netlify.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321/fr/
npm run build    # static site in dist/
npm run preview
```

## Where things are

- `src/pages/fr/` and `src/pages/en/`: one file per page and language, each just mounts a component with its `lang`.
- `src/components/`: the home page sections (Hero, Cards, Features, Reviews, Host, Faq, Footer, Lightbox), the booking Calendar, and the Booking and Owner pages.
- `src/i18n.ts`: page URLs per language and the `t('français', 'English')` helper used everywhere.
- `src/styles/global.css`: every shared style; `book.css`: the booking and owner pages.
- `src/data/`: `pricelabs.json` (a year of nightly prices and minimum stays read from PriceLabs), `bookings.json` (booked and blocked dates), `galleries.json` (which photos each room opens), `marquee.json` (the room-by-room row).
- `public/img/`: the photos, numbered as in the original contact sheet.

## How booking works

Guests pick their dates on the site's calendar, which shows what is free and the minimum stay Airbnb applies to each check-in date, then a button opens the Airbnb listing with those dates and the party size filled in. Payment, deposit and cancellation stay on Airbnb. The owner page lets Laure add private stays, which will close the dates on Airbnb through an outgoing iCal feed.

## Still to come

- Live data: bookings from the Airbnb iCal feed and minimum stays from PriceLabs on a schedule, instead of the JSON files in `src/data/`.
- The outgoing iCal feed for private stays, and saving them somewhere other than the browser.
- The owner area behind a password.
- Live rating and review count from Airbnb.
- The registration number (meublé de tourisme) in the footer, and the site's domain in `astro.config.mjs` (`site`) for absolute hreflang links.
