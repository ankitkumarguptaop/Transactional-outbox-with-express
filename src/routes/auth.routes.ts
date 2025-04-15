import express from 'express'

import { authController } from "../controllers";
import { imageUpload } from "../middlewares";

const router = express.Router();

router.post(
  "/signup",
  imageUpload.upload().single("profilePic"),
  authController.signUp
);
router.post("/signin", authController.signIn);

export default router;
