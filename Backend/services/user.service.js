import useModel from "../models/user.model";

// Used to create user-
module.exports.createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = userModel.create({
    fullName: { firstName, lastName },
    email,
    password,
  });

  return user;
};
