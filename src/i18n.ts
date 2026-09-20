export type Lang = 'fr' | 'en';
export const langs: Lang[] = ['fr', 'en'];
/** Every page exists in both languages; these are the URLs, French first. */
export const urls = {
  home: { fr: '/fr/', en: '/en/' },
  house: { fr: '/fr/la-maison/', en: '/en/the-house/' },
  area: { fr: '/fr/les-alentours/', en: '/en/the-area/' },
  practical: { fr: '/fr/infos-pratiques/', en: '/en/practical/' },
  book: { fr: '/fr/reserver/', en: '/en/book/' },
  owner: { fr: '/fr/proprietaire/', en: '/en/owner/' },
} as const;
export type Page = keyof typeof urls;
/** t('texte français', 'English text') picks the one for the page's language. */
export const t = (lang: Lang) => (fr: string, en: string) => (lang === 'fr' ? fr : en);

/** The Airbnb listing, and the ways to reach Laure. */
export const AIRBNB = 'https://www.airbnb.com/rooms/52958887';
export const AIRBNB_MESSAGE = 'https://www.airbnb.com/contact_host/52958887/guest_inquiry';
export const PHONE = '+33625462209';
export const PHONE_SHOWN = '+33 6 25 46 22 09';
export const WHATSAPP = 'https://wa.me/33625462209';
