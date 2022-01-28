import express from "express";
import { getAuthMiddleware } from "./config/auth";



const app = express();
const port = process.env.PORT || 3000;

app.use(getAuthMiddleware())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
