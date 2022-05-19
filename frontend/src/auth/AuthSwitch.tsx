import {
  getAuthState,
  getLoginURL,
  getLogoutURL,
  onAuthStateChanged,
} from "./service"
import {
  AuthState,
  AuthStateName,
} from "./types"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

type StateComponent = (params: {
  t: (l: string) => string
  authState: AuthState,
  links: { login: string, logout: string }
}) => JSX.Element | JSX.Element[]

export function AuthSwitch(
  { loading, error, loggedIn, loggedOut, unknown }:
    { loading: StateComponent, error: StateComponent, loggedIn: StateComponent, loggedOut: StateComponent, unknown: StateComponent }
) {
  const stateComponents: Record<AuthStateName | "unknown", StateComponent> = {
    loading, error, loggedIn, loggedOut, unknown
  }
  const { t } = useTranslation()
  const [authState, setAuthState] = useState(getAuthState())
  useEffect(() => {
    const { unsubscribe } = onAuthStateChanged((authState) =>
      setAuthState(authState)
    )
    return function cleanup() {
      unsubscribe()
    }
  }, [])

  const links = {
    login: getLoginURL(),
    logout: getLogoutURL()
  }
  const stateComponent = stateComponents[authState.state]
  if (stateComponent) {
    return stateComponent({ t, authState, links })
  } else {
    return stateComponents.unknown({ t, authState, links })
  }
}
