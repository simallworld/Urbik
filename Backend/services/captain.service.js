import captainModel from "../models/captain.model.js";

async function createCaptain({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType
}) {
    console.log("createCaptain inputs =>", { firstName, lastName, email, password, color, plate, capacity, vehicleType });
  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }
  const captain = await captainModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });
  return captain;
}

export default { createCaptain };
