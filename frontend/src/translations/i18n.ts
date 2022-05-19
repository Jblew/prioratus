import { default as i18n_ } from "i18next"
import { initReactI18next } from "react-i18next"
import { pl } from "./pl"
import { en } from "./en"
import LanguageDetector from "i18next-browser-languagedetector"

export const i18n = i18n_
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .init({
        resources: { pl, en },
        supportedLngs: ["en", "pl"],

        interpolation: {
            escapeValue: false,
        },
    })

export interface Language {
    code: string
    name: string
}

export const availableLanguages: Language[] = [
    { code: "en", name: "English" },
    { code: "pl", name: "Polski" },
]
