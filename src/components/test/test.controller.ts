import AsyncTryCatch from "../../utils/asyncTryCatch";
import router from "../expressRouter";

import { testService } from "./test.service";

router.get(
	"/test",
	AsyncTryCatch((req, res) => {
		const test = testService();
		return res.send(test);
	})
);

export default router;
