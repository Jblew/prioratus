import i18n, { availableLanguages } from "translations";
import NavDropdown from "react-bootstrap/NavDropdown";

export function LanguageChooserDropdown() {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const currentLanguage =
    availableLanguages.filter((l) => l.code === i18n.language)[0] ||
    "Unknown language";
  return (
    <NavDropdown title={currentLanguage.name} id="basic-nav-dropdown">
      {availableLanguages.map((lang) => (
        <NavDropdown.Item
          onClick={() => changeLanguage(lang.code)}
          key={lang.code}
        >
          {lang.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}
