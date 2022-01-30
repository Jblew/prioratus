import { ApiHTTPError, getFromApi } from "api";

export interface AuthState {
  loading: boolean;
  error: boolean;
  profile?: UserProfile;
}

export interface UserProfile {
  name: string;
  displayName: string;
}

export type AuthStateSubscriberFn = (authState: AuthState) => void;

export function onAuthStateChanged(subscribeFn: AuthStateSubscriberFn): {
  unsubscribe(): void;
} {
  addSubscriber(subscribeFn);
  setAuthStateTimerIfNotSet();
  return {
    unsubscribe: () => removeSubscriber(subscribeFn),
  };
}

(window as any).currentAuthState = loadingAuthState();
export function getAuthState(): AuthState {
  return (window as any).currentAuthState;
}

async function checkAuthState() {
  notifySubscribers(loadingAuthState());
  try {
    const profile = await getFromApi<UserProfile>("/profile");
    setAuthStateAndNotifySubscribers(successAuthState(profile));
  } catch (err) {
    if (err instanceof ApiHTTPError && err.code === 403) {
      setAuthStateAndNotifySubscribers(notLoggedInAuthState());
    } else {
      setAuthStateAndNotifySubscribers(errorAuthState());
      throw err;
    }
  }
}

function loadingAuthState(): AuthState {
  return { loading: true, error: false };
}

function errorAuthState(): AuthState {
  return { loading: false, error: true };
}

function successAuthState(profile: UserProfile): AuthState {
  return { loading: false, error: false, profile };
}

function notLoggedInAuthState(): AuthState {
  return { loading: false, error: false };
}

(window as any).authStateTimer = null;
function setAuthStateTimerIfNotSet() {
  if (!(window as any).authStateTimer) {
    checkAuthStateLoop();
  }
}

async function checkAuthStateLoop() {
  const intervalSuccessMs = 30 * 60 * 1000; // 30 minutes
  const intervalErrorMs = 2 * 60 * 1000; // 2 minute

  try {
    await checkAuthState();
    (window as any).authStateTimer = setTimeout(
      () => checkAuthStateLoop(),
      intervalSuccessMs
    );
  } catch (err) {
    console.error(err);
    (window as any).authStateTimer = setTimeout(
      () => checkAuthStateLoop(),
      intervalErrorMs
    );
  }
}

function setAuthStateAndNotifySubscribers(authState: AuthState) {
  (window as any).currentAuthState = authState;
  notifySubscribers(authState);
}

(window as any).authStateSubscribers = [];
function addSubscriber(fn: AuthStateSubscriberFn) {
  (window as any).authStateSubscribers.push(fn);
}
function removeSubscriber(fn: AuthStateSubscriberFn) {
  const index = (window as any).authStateSubscribers.indexOf(fn);
  if (index === -1) {
    throw new Error(`No such subscriber to authState: ${fn}`);
  }
  (window as any).authStateSubscribers.splice(index);
}
function notifySubscribers(state: AuthState) {
  (window as any).authStateSubscribers.forEach((subscriberFn: any) =>
    subscriberFn(state)
  );
}
