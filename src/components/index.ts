import router from "./expressRouter";
import testController from "./test/test.controller";

router.use("/api/v1", testController);

export default router;
