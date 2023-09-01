import i18n from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
const config = ({
    translations: {
        en: { lang },
        cs: { lang },
    },
    loaders: [
        {
            locale: 'en',
            key: 'common',
            loader: async () => (
                await import('./en/common.json')
            ).default,
        },
        {
            locale: 'it',
            key: 'common',
            loader: async () => (
                await import('./it/common.json')
            ).default,
        },
    ],
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
