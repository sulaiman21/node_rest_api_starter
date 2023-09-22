import createError from "http-errors";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { config } from "dotenv";
import passport from "passport";
import session from "express-session";
import multer from "multer";
import fs from "fs";

config();

// DB connection
import "./database";

import routes from "./components/index";
import errorHandler from "./middleware/errorHandler.middleware";

export const storage = multer.diskStorage({
	destination(req, file, cb) {
		console.log("REQWU ==> ", req);
		return cb(null, "./assets/files");
	},
	filename(req, file, cb) {
		const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9);

		return cb(null, file.fieldname + "-" + fileName);
	},
});

const app = express();

app.use(express.static("assets"));
app.use(
	cors({
		origin: "*", //TODO: We will change the origin to our specific urls later
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	session({
		secret: "fake secret", // TODO: will add a proper envs later
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.session());
app.use(passport.initialize());

app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(errorHandler);

export default app;
