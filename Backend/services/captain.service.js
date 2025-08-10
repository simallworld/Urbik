import captainModel from "../models/captain.model.js";

async function createCaptain({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) {
  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error(
      "All fields are required"
    );
  }

  // coerce capacity to number (frontend may send string)
  const capacityNum = Number(capacity);
  if (!Number.isFinite(capacityNum) || capacityNum <= 0) {
    throw new Error("Vehicle capacity must be a positive number");
  }

  if (!/^[A-Za-z0-9\s-]+$/.test(plate)) {
    throw new Error("Invalid vehicle plate format");
  }

  email = email.toLowerCase();

  try {
    const captain = await captainModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color,
        plate: plate.toUpperCase(),
        capacity: capacityNum,
        vehicleType,
      },
    });

    // Model's toJSON removes password; return created document
    return captain;
  } catch (error) {
    if (error.code === 11000) {
      // check which key is duplicated
      const dupKey = Object.keys(error.keyPattern || {})[0] || "value";
      throw new Error(`${dupKey} already registered`);
    }
    throw error;
  }
}

export default { createCaptain };
