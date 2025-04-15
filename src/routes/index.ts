import express, { Router } from "express";
import { authMiddleware } from "../middlewares";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", authMiddleware.jwtTokenValidation, userRoutes);
router.use("/products", authMiddleware.jwtTokenValidation, productRoutes);

export default router;
