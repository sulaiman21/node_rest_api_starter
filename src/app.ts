import createError from "http-errors";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { config } from "dotenv";

config();

// DB connection
import "./database";

import routes from "./components/index";
import errorHandler from "./middleware/errorHandler.middleware";

const app = express();

app.use(
	cors({
		origin: "*", //TODO: We will change the origin to our specific urls later
	})
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(errorHandler);

export default app;
