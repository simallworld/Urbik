import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";
import BlacklistTokenModel from "../models/blacklistToken.model.js";
import { validationResult } from "express-validator";

async function registerCaptain(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: "Captain already exist" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    next(error);
  }
}

async function loginCaptain(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
}

async function getCaptainProfile(req, res, next) {
  res.status(200).json({ captain: res.captain });
}

async function logoutCaptain(req, res, next) {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await BlacklistTokenModel.create({ token });

  res.clearCookie("token");

  res.status(200).json({ message: "Loggedout successfully" });
}

export default {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
};
