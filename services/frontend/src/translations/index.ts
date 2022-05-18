import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { pl } from "./pl";
import { en } from "./en";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources: { pl, en },
    supportedLngs: ["en", "pl"],

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export interface Language {
  code: string;
  name: string;
}

export const availableLanguages: Language[] = [
  { code: "en", name: "English" },
  { code: "pl", name: "Polski" },
];
