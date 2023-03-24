import { NextFunction, Request, Response, Handler } from "express";

const AsyncTryCatch = (controller: Handler) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await controller(req, res, next);
	} catch (error) {
		return next(error);
	}
};

export default AsyncTryCatch;
