import en from './en.json'
import de from './de.json'

const translations = { en, de }

const lang = navigator.language.startsWith('de') ? 'de' : 'en'
const msgs = translations[lang] ?? translations.en

export function useI18n() {
  return function t(key, vars = {}) {
    let str = msgs[key] ?? key
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(`{${k}}`, v)
    }
    return str
  }
}