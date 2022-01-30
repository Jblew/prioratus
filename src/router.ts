import express from "express";
import { authOr403 } from "@/auth";
import { envMust } from "./utils";

const frontendRecirectURL = envMust("FRONTEND_RECIRECT_URL");
export function getRoutes() {
  const router = express.Router();
  router.get("/", (_req, res) => {
    res.redirect(frontendRecirectURL);
  });

  router.get("/health", authOr403(), (req, res) => {
    res.send({ ok: true });
  });

  router.get("/profile", authOr403(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });
  return router;
}
