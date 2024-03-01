import express from "express";
import { userRouter } from "./userRoutes.js";
import { accountRouter } from "./accountRoutes.js";

const router = express.Router();

router.use("/user", userRouter);

export default router;
