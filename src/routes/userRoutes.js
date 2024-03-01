import express from "express";
import userSignupController from "../controllers/user/userSignupController.js";
import userSigninController from "../controllers/user/userSigninController.js";

const router = express.Router();

// Public routes
router.post("/signup", userSignupController);
router.post("/signin", userSigninController);

export { router as userRouter };
