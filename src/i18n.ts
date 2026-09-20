export type Lang = 'fr' | 'en';
export const langs: Lang[] = ['fr', 'en'];
/** Every page exists in both languages; these are the URLs, French first. */
export const urls = {
  home: { fr: '/fr/', en: '/en/' },
  book: { fr: '/fr/reserver/', en: '/en/book/' },
  owner: { fr: '/fr/proprietaire/', en: '/en/owner/' },
} as const;
export type Page = keyof typeof urls;
/** t('texte français', 'English text') picks the one for the page's language. */
export const t = (lang: Lang) => (fr: string, en: string) => (lang === 'fr' ? fr : en);
