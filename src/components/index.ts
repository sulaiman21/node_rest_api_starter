import { Router } from "express";

import authController from "./auth/auth.controller";
import uploadFileController from "./uploadFile/uploadFile.controller";

const router = Router();

router.use("/api/v1/auth", authController);
router.use("/api/v1/file", uploadFileController);

export default router;
