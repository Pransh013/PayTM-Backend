import express from "express";
import userSignupController from "../controllers/user/userSignupController.js";
import userSigninController from "../controllers/user/userSigninController.js";
import userSearchController from "../controllers/user/userSearchController.js";
import userUpdateController from "../controllers/user/userUpdateController.js";
import authMiddleWare from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", userSignupController);
router.post("/signin", userSigninController);

//Protected Routes
router.put("/update", authMiddleWare, userUpdateController);
router.get("/search", authMiddleWare, userSearchController);

export { router as userRouter };
