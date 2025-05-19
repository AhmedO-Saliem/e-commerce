import { Router } from "express";
import * as UC from "./user.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.route("/signup").post(UC.signUp)
router.route("/signin").post(UC.signIn);
router.route("/profile").get(auth,UC.getProfile);
router.route("/verify-email/:token").get(UC.verifyEmail);
export default router;
