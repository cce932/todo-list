import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './local/resources';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
