import express from "express";
import authMiddleWare from "../middlewares/authMiddleware.js";
import accountBalanceController from "../controllers/account/accountBalanceController.js";
import accountTransactionController from "../controllers/account/accountTransactionController.js";
import accountDetailsController from "../controllers/account/accountDetailsController.js";

const router = express.Router();

// Protected routes
router.get("/balance", authMiddleWare, accountBalanceController);
router.get("/details", authMiddleWare, accountDetailsController);
router.post("/transfer", authMiddleWare, accountTransactionController);

export { router as accountRouter };
