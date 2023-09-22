import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import AsyncTryCatch from "../../utils/asyncTryCatch";
import httpStatus from "http-status";
import { Xml2Js } from "../../libs/xmlToJson";
import path from "path";

const router = Router();

const upload = multer({ dest: "./public/files" });

router.post(
	"/upload",
	upload.single("file"),
	AsyncTryCatch(async (req: Request, res: Response, next: NextFunction) => {
		try {
			const file = req.file;

			if (!file) {
				return res
					.status(httpStatus.BAD_REQUEST)
					.json({ message: "Bad request!" });
			}
			const ext = path.extname(file.originalname);

			if (ext !== ".xml") {
				return res
					.status(httpStatus.BAD_REQUEST)
					.json({ message: "Only .xml files are allowd!" });
			}

			const xml2js = new Xml2Js();

			const result = await xml2js.converToJs(file.path);

			return res.status(200).json({ ok: "ok", result });
		} catch (error) {
			console.log("error ==> ", error);
			return res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.json({ message: error?.message || "Internal server error" });
		}
	})
);

export default router;
