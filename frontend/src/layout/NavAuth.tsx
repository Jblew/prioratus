import {
  AuthState,
  AuthStateName,
  getAuthState,
  getLoginURL,
  getLogoutURL,
  onAuthStateChanged,
} from "auth";
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

  const stateComponent = stateComponents[authState.state];
  if (stateComponent) {
    return stateComponent({ t, authState });
  } else {
    return stateComponents.default({ t, authState });
  }
}

type StateComponent = (params: {
  t: (l: string) => string;
  authState: AuthState;
}) => JSX.Element;

const stateComponents: Record<AuthStateName | "default", StateComponent> = {
  loading: function ({ t }) {
    return (
      <NavDropdown title={t("Loading login...")} id="basic-nav-dropdown">
        <NavDropdown.Item>{t("Loading login...")}</NavDropdown.Item>
      </NavDropdown>
    );
  },
  error: function ({ t }) {
    return (
      <NavDropdown title={t("Login error")} id="basic-nav-dropdown">
        <NavDropdown.Item>{t("Login error")}</NavDropdown.Item>
      </NavDropdown>
    );
  },
  loggedIn: function ({ t, authState }) {
    return (
      <NavDropdown title={authState.profile!.name} id="basic-nav-dropdown">
        <NavDropdown.Item href={getLogoutURL()}>
          {t("Log out")}
        </NavDropdown.Item>
      </NavDropdown>
    );
  },
  loggedOut: function ({ t, authState }) {
    return <Nav.Link href={getLoginURL()}>{t("Log in")}</Nav.Link>;
  },
  default: function () {
    return <Nav.Item>Unknown auth state</Nav.Item>;
  },
};
