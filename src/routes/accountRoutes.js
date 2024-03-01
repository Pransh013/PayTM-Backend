import express from "express";
import authMiddleWare from "../middlewares/authMiddleware.js";
import accountBalanceController from "../controllers/account/accountBalanceController.js";
import accountTransactionController from "../controllers/account/accountTransactionController.js";

const router = express.Router();

// Protected routes
router.get("/balance", authMiddleWare, accountBalanceController);
router.post("/transfer", authMiddleWare, accountTransactionController);

export { router as accountRouter };
