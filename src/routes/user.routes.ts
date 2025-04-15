const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();
const { authMiddleware } = require("../middlewares");

router.delete("/", authMiddleware.jwtTokenValidation, userController.deleteUser );
router.patch("/", authMiddleware.jwtTokenValidation, userController.updateUser );

export default router;
