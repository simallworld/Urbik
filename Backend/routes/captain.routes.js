import express from "express";
import captainController from "../controllers/captain.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/register", [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullName.firstName').isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters"),
    body("vehicle.color").isLength({min: 3}).withMessage("Color must be at least 3 characters"),
    body("vehicle.plate").isLength({min: 3}).withMessage("Plate must be at least 3 characters"),
    body("vehicle.capacity").isInt({min: 1}).withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType").isIn(["car", "bike", "auto", "e-rikshaw"]).withMessage("Invalid type"),
],
    captainController.registerCaptain);

export default router;
