import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "./translations"
import { AuthSwitch } from "./auth"
import { FaUser } from "react-icons/fa"

export function TopNav() {
  const { t } = useTranslation()
  return (
    <Navbar className="top-nav" bg="light" expand="md">
      <Container>
        <Navbar.Brand href="#home">{t("Prioratus")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
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
      <NavDropdown title={<><FaUser /> {t("Loading login...")}</>}>
        <NavDropdown.Item><FaUser /> {t("Loading login...")}</NavDropdown.Item>
      </NavDropdown>
    )}
    error={() => (
      <NavDropdown title={<><FaUser /> {t("Login error")}</>}>
        <NavDropdown.Item><FaUser /> {t("Login error")}</NavDropdown.Item>
      </NavDropdown>
    )}
    loggedIn={({ authState, links }) => (
      <NavDropdown title={<><FaUser /> {authState.profile!.name}</>}>
        <NavDropdown.Item href={links.logout}>
          {t("Log out")}
        </NavDropdown.Item>
      </NavDropdown>
    )}
    loggedOut={({ links }) => (
      <Nav.Link href={links.login}><FaUser /> {t("Log in")}</Nav.Link>
    )}
    unknown={() => (
      <Nav.Item><FaUser /> Unknown auth state</Nav.Item>
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