import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as redirectController from "./controllers/redirectController.js";

const router = new Router();

router.get("/", mainController.showMain);
router.post("/", mainController.showMain);
router.get("/random", redirectController.redirectRandom)
router.get("/:tag", redirectController.redirect)

export { router };
