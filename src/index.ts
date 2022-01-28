import express from "express";
import { getAuthMiddleware, requiresAuth } from "@/auth";

const app = express();
const port = process.env.PORT || 3000;

app.use(getAuthMiddleware())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
