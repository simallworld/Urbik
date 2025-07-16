import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Creating User authentication middleware
async function authUser(req, res, next) {
  //finding token in cookies or header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  //if token not found in both places, return 401
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await userModel.findOne({ token: token });
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
export default authUser;
