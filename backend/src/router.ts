import express from "express"
import { authOr403 } from "@/auth"
import { envMust } from "./utils"
import { UserConfig } from "./userconfigs"

const frontendRecirectURL = envMust("FRONTEND_RECIRECT_URL")
export function getRoutes({ userConfigs }: { userConfigs: UserConfig[] }) {
  const router = express.Router()
  router.get("/", (_req, res) => {
    res.redirect(frontendRecirectURL)
  })

  router.get("/health", (req, res) => {
    res.send({ ok: true })
  })

  router.get("/profile", authOr403(), (req, res) => {
    const user = req.oidc.user!
    const profile = {
      ...user,
      enrolledInBeta: isUserEnrolledInBeta(user, userConfigs),
    }
    res.send(JSON.stringify(profile))
  })
  return router
}

function isUserEnrolledInBeta(user: Record<string, unknown>, userConfigs: UserConfig[]): boolean {
  const email = user.email
  if (!email) { return false }
  return userConfigs.find(conf => conf.user === email) !== undefined
}