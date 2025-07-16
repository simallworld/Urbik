import userModel from "../models/user.model.js";

// Used to create user-
async function createUser({ firstName, lastName, email, password }) {
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = await userModel.create({
    fullName: { firstName, lastName },
    email,
    password,
  });

  return user;
}

export default {
  createUser,
};
