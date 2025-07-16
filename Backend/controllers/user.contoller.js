import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator";

export async function registerUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
}

export default {
  registerUser,
};