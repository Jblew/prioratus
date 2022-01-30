import express from "express";
import { requiresAuth } from "@/auth";

export function getRoutes() {
  const router = express.Router();
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });
  return router;
}
