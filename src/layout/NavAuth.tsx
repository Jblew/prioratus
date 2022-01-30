import { getAuthState, getLoginURL, logOut, onAuthStateChanged } from "auth";
import { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
import Nav from "react-bootstrap/Nav";

export function NavAuth() {
  const { t } = useTranslation();
  const [authState, setAuthState] = useState(getAuthState());
  useEffect(() => {
    const { unsubscribe } = onAuthStateChanged((authState) =>
      setAuthState(authState)
    );
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  if (authState.loading) {
    return (
      <NavDropdown title={t("Loading login...")} id="basic-nav-dropdown">
        <NavDropdown.Item>{t("Loading login...")}</NavDropdown.Item>
      </NavDropdown>
    );
  } else if (authState.error) {
    return (
      <NavDropdown title={t("Login error")} id="basic-nav-dropdown">
        <NavDropdown.Item>{t("Login error")}</NavDropdown.Item>
      </NavDropdown>
    );
  } else if (authState.profile) {
    return (
      <NavDropdown title={authState.profile.name} id="basic-nav-dropdown">
        <NavDropdown.Item onClick={() => logOut()}>
          {t("Log out")}
        </NavDropdown.Item>
      </NavDropdown>
    );
  }

  return <Nav.Link href={getLoginURL()}>{t("Log in")}</Nav.Link>;
}
