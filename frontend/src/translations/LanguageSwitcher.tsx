import { i18n, availableLanguages } from "./i18n"

export function LanguageSwitcher(
  { List, Item }:
    {
      List: React.FC<{ children: JSX.Element[], currentLangName: string }>,
      Item: React.FC<{ name: string, code: string, chooseThisLanguage: () => void }>
    }
) {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  const currentLanguage =
    availableLanguages.filter((l) => l.code === i18n.language)[0] ||
    "Unknown language"

  return <List currentLangName={currentLanguage.name}>
    {availableLanguages.map((lang) => (<Item
      name={lang.name}
      code={lang.code}
      key={lang.code}
      chooseThisLanguage={() => changeLanguage(lang.code)}
    />))}
  </List>

}
