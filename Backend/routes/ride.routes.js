import express from "express";
import { body, query } from "express-validator";
import rideController from "../controllers/ride.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware.authUser,
  // body('userId').isString().isLength({min: 24, max: 24}).withMessage('Invalid user Id'),
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pick address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "bike", "eRikshaw"])
    .withMessage("Invalid vehicle type"),
  rideController.createRide
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  rideController.getFare
);

router.post(
  "/confirm",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  rideController.confirmRide
);

router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  rideController.startRide
);

router.post(
  "/end-ride",
  authMiddleware.authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  rideController.endRide
);

export default router;
