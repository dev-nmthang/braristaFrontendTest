import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import es from './es';
import fr from './fr';
import de from './de';
import it from './it';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      it: { translation: it }
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18next; 