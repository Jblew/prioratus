import express from "express";
import { getAuthMiddleware } from "@/auth";
import { getRoutes } from "./router";
import morgan from "morgan";
import { initDatabase } from "./db";

const app = express();
const port = process.env.PORT || 3000;
const routeBase = process.env.ROUTE_BASE || "/";

initDatabase();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(routeBase, getAuthMiddleware());
app.use(routeBase, getRoutes());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
