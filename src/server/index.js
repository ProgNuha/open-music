import "dotenv/config";
import express from "express";
import path from "path";
import routes from "../routes/index.js";
import errorHandler from "../middlewares/error.js";

const app = express();

app.use(express.json());
// eslint-disable-next-line no-undef
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(routes);
app.use(errorHandler);

export default app;
