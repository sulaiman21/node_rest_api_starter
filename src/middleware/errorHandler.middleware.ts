import { ErrorRequestHandler } from "express";
import AppError from "../utils/AppError";

const errorHandler: ErrorRequestHandler = (error, req, res) => {
	/**
	 * NOTE: We will add some other error here.
	 * We will return errors from here to avoid repeated code.
	 */

	// App ERRORS
	if (error instanceof AppError) {
		// Add any extra logic if needed
		return res.status(error.statusCode).json({
			message: error.errorMessage,
			errorCode: error.statusCode,
		});
	}

	// Validation error
	if (error.name === "ValidationError") {
		return res.status(400).json({
			type: "ValidationError",
			message: error.message || "",
		});
	}

	// set locals, only providing error in development
	res.locals.message = error.message;
	res.locals.error = req.app.get("env") === "development" ? error : {};

	// render the error page
	return res.status(500).send("Something went wrong");
};

export default errorHandler;
