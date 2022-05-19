import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "./translations"
import { AuthSwitch } from "./auth"

export function TopNav() {
  const { t } = useTranslation()
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">{t("Prioratus")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Nav>
            <AuthDropdown />
            <LangDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function AuthDropdown() {
  const { t } = useTranslation()
  return <AuthSwitch
    loading={() => (
      <NavDropdown title={t("Loading login...")}>
        <NavDropdown.Item>{t("Loading login...")}</NavDropdown.Item>
      </NavDropdown>
    )}
    error={() => (
      <NavDropdown title={t("Login error")}>
        <NavDropdown.Item>{t("Login error")}</NavDropdown.Item>
      </NavDropdown>
    )}
    loggedIn={({ authState, links }) => (
      <NavDropdown title={authState.profile!.name}>
        <NavDropdown.Item href={links.logout}>
          {t("Log out")}
        </NavDropdown.Item>
      </NavDropdown>
    )}
    loggedOut={({ links }) => (
      <Nav.Link href={links.login}>{t("Log in")}</Nav.Link>
    )}
    unknown={() => (
      <Nav.Item>Unknown auth state</Nav.Item>
    )}
  />
}

function LangDropdown() {
  return <LanguageSwitcher
    List={(({ currentLangName, children }) => (
      <NavDropdown title={currentLangName}>
        {children}
      </NavDropdown>
    ))}
    Item={(({ name, chooseThisLanguage }) => (
      <NavDropdown.Item onClick={() => chooseThisLanguage()}>
        {name}
      </NavDropdown.Item>
    ))}
  />
}