import express from "express";
import { getAuthMiddleware } from "@/auth";
import { getRoutes } from "./router";

const app = express();
const port = process.env.PORT || 3000;
const routeBase = process.env.ROUTE_BASE || "/";

app.use(getAuthMiddleware());
app.use(routeBase, getRoutes());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
