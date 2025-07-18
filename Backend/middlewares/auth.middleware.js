import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import blackListTokenModel from "../models/blacklistToken.model.js";

//Creating User authentication middleware
async function authUser(req, res, next) {
  //finding token in cookies or header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  //if token not found in both places, return 401
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  //verifying token using secret key
  try {
    //decoding token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //finding user in database
    const user = await userModel.findById(decoded.id);
    //Setting user
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

//Creating Captain authentication middleware
async function authCaptain(req, res, next) {
  //finding token in cookies or header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  //if token not found in both places, return 401
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  //verifying token using secret key
  try {
    //decoding token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //finding user in database
    const captain = await captainModel.findById(decoded.id);
    //Setting user
    req.captain = captain;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default { authUser, authCaptain };
