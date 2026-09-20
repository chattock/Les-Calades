# Product

<!-- impeccable:product-schema 1 -->

Written 2026-09-20 from james's brief, the Airbnb listing, the PriceLabs data, the guest booklet (Theme), the inspo video and the 40 photos. james has been sent 26 questions and has not yet answered; every line marked **[assumed]** is inferred from the brief and will be corrected from his answers.

## Platform

web

## Stack

delegated: Astro 5 with `@astrojs/netlify`, hosted on Netlify, built-in i18n with `/fr/` and `/en/` both prefixed. Chosen because the site is mostly static photography with two locales and a small dynamic surface (availability, quote, booking request) that Netlify Functions cover. james asked for a plan and named Netlify as the host; the framework was left to me and is pending his confirmation.

## Users

Primary: people choosing a holiday house in the Gard for a week or two with a group, typically families or two families together, or a group of friends, 8 to 10 people, booking months ahead. They arrive from a link on the Airbnb listing, from james's or the hosts' own recommendation, or from a search for a villa with a pool near Uzès, Nîmes, Avignon or the Pont du Gard. They are comparing against Airbnb itself, so the site must make direct booking feel at least as safe.
Languages: French and English guests in roughly equal measure **[assumed from the listing's English voice and the property's location]**.
Secondary: returning guests who already know the house and want dates and a price without going through Airbnb.
Later, private: the owner-side calendar for james and the hosts, a separate surface.

## Product Purpose

A direct website for Les Calades, a 4-bedroom stone village house with a private pool in Lédenon, so that guests can find it, trust it, see availability and book it without Airbnb taking roughly 15.5% of every stay. The public site is phase one and must be nailed first; a private calendar and then a booking-and-payment flow follow.

Success: a guest who has seen the Airbnb listing chooses to book here instead, and a guest who has never seen the listing books here first.

## Positioning

A specific old house in an old agricultural village, in the shadow of a 12th-century château, with terraces looking across the Rhône plain to Mont Ventoux, a secluded private pool, and the modern conveniences (high-speed wifi, air conditioning). Hosted personally by John and Laure, who meet guests at the door with the keys. The truthful claim a template cannot copy: this exact place, these exact hosts, this exact view, priced without a platform's cut.

Two facts to state plainly rather than hide, because they filter for the right guests: the house has many stairs and is not suitable for anyone with mobility trouble; pool use requires a signed liability waiver.

## Operating Context

- Airbnb listing 52958887 remains live; the site sits alongside it and links to it as proof.
- PriceLabs sets the nightly rate daily (EUR, base 317, floor 100, ceiling 750, min stays 4 to 28 nights depending on the period) and pushes it to Airbnb. The site's prices come from PriceLabs, never a second hand-kept table.
- Hosts: John Chattock and Laure Bosc (signature in the guest booklet), phone +33 6 25 46 22 09. Address 2 rue du Reservoir, 30210 Lédenon. Check-in 17h with a personal welcome and tour; check-out 11h. Private guarded parking for 3 cars plus one outdoor space. Three security cameras (parking, mur du Mazet, passage sous porche).
- Nearby: Pont du Gard, Uzès, Nîmes, Avignon, the Camargue, local markets; supermarkets in Remoulins and Marguerittes. Lédenon also has a motor-racing circuit (unmentioned by james; treatment undecided).
- Season: strong summer demand, PriceLabs reports occupancy well above market in September and October. Guests book long stays (a 28-night booking is on the books for June 2027).

## Capabilities and Constraints

- Phase 1 (this work): public site, five pages (Home, The house, The area, Rates and availability, Practical), French and English, deployed to Netlify on a Les Calades domain. No booking yet; the call to action is to check dates and enquire **[assumed: request-then-approve rather than instant booking]**.
- Phase 2: private calendar reading PriceLabs prices and reservations. Phase 3: booking requests, then payment (Stripe Checkout, Swikly for the damage deposit; Mollie as fallback). Legal prerequisites: national meublé de tourisme registration number (must appear on the site), SIRET, taxe de séjour handling.
- Content is bilingual and mirrored; French at the root **[assumed]**.
- Photos: 40 professional images at 2048px, landscape 3:2 with five portraits, in `/mnt/project-files/uploads/photos/` (to be moved into the repo). No video of the house.
- Airbnb's own domain and image CDN are unreachable from the build environment; nothing is fetched from Airbnb at runtime.
- Undecided product facts: the domain name; the site's voice (john and Laure, "we", or james); which guests to favour; whether the hosts ever block dates for their own use; deposit, balance and cancellation terms; whether there are other listing channels.

## Brand Commitments

- Name: Les Calades (a *calade* is a cobbled stone path in Provençal; james to confirm the origin).
- Inspired by, not copying, the guest welcome booklet in `/mnt/project-files/uploads/theme/`: white and cream grounds, a greige band, charcoal `#3f3237` headings in Poppins Bold caps with a second line in a thin green `#3f5721` brush script, Poppins Light body, generous space. james: "doesn't need to be exact but you can be inspired by it", and specifically the white, cream, the green and "that lovely font in places", and "things being given enough space".
- The golden canon page construction for layout geometry (james's explicit ask).
- Inspo video: a Framer holiday-rental template with a full-bleed photo hero, pill buttons, floating review card, feature cards, host section, FAQ accordion and dark footer. Read as the *shape* of a modern rental site james likes, not as a palette. Twelve further Dribbble references were supplied as bookmarks only and are not yet visible.
- Airbnb listing title and description are the incumbent copy; the description's voice (English, warm, practical) is the voice to keep unless james says otherwise.

## Evidence on Hand

- 40 photos, indexed by content in `/mnt/project-files/uploads/ASSETS-INDEX.md`. Hero candidates: 1 (pool with the château behind) and 40 (view over the village to the plain).
- Airbnb: 4.88 from 32 reviews, 88% five-star, host "5 years hosting". Individual review texts not yet captured.
- Listing copy: `/mnt/project-files/airbnb/listing-summary.md`.
- Guest booklet: three pages with practical facts (above), `/mnt/project-files/uploads/theme/`.
- Absent, do not fabricate: guest names or quotes beyond what Airbnb shows; prices other than what PriceLabs returns; a registration number; any award or press.

## Product Principles

1. The photographs and the view are the argument; words are short and specific.
2. Say the awkward things (stairs, waiver, minimum stays) early and plainly; the right guests will thank us.
3. Feel as safe to book as Airbnb, and more personal: the hosts have names and a phone number.
4. Two languages, one site; nothing is second-class in French or in English.
5. Few pages, few choices per screen; a tired person on a phone should find the dates in one tap.

## Accessibility & Inclusion

Standard web accessibility (keyboard, contrast, alt text on every photo, reduced motion respected). The house itself is not accessible to people with reduced mobility, and the site must say so before anyone books, not after.
