# Les Calades

The direct-booking website for Les Calades, a village house with a pool in Lédenon (Gard). French first, every page also in English.

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

## Still to come

- Payment: Stripe Checkout for the deposit with the card saved, the balance charged automatically on the due date.
- Live data: prices from PriceLabs and bookings from the Airbnb iCal feed on a schedule, and an outgoing iCal feed for Airbnb and PriceLabs.
- The owner area behind a password.
- Live rating and review count from Airbnb.
- The registration number (meublé de tourisme) in the footer, and the site's domain in `astro.config.mjs` (`site`) for absolute hreflang links.
