import express from "express";
import { body } from "express-validator";
import userController from "../controllers/user.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const router = express.Router();

//Register route
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  userController.registerUser
);

//Login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password required"),
  ],
  userController.loginUser
);

//Profile route
router.get("/profile", authUser, userController.getUserProfile);

//Logout route
router.get("/logout", authUser, userController.getUserProfile);

export default router;
