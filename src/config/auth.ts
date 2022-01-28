import { auth } from "express-openid-connect";

export function getAuthMiddleware() {
  return auth({
    authRequired: false,
    auth0Logout: true,
    secret: envMust("OIDC_AUTH_SECRET"),
    baseURL: envMust("BASE_URL"),
    clientID: envMust("OIDC_CLIENT_ID"),
    issuerBaseURL: envMust("OIDC_ISSUER_BASEURL"),
    routes: {
      callback: "auth_callback",
    },
  });
}

function envMust(name: string): string {
    const v = process.env[name]
    if (typeof v === "undefined") throw new Error(`Missing env ${name}`)
    return v
}