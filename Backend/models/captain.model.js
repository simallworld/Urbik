import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "FirstName must be at least 3 characters long"],
        trim: true,
      },
      lastName: {
        type: String,
        minlength: [3, "LastName must be at least 3 characters long"],
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter valid email"],
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      ],
    },
    socketId: {
      type: String,
      sparse: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
      index: true,
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minLength: [3, "Color must be at least 3 characters long"],
        trim: true,
      },
      plate: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, "Plate must be at least 3 characters long"],
        trim: true,
        uppercase: true,
        index: true,
      },
      capacity: {
        type: Number, // changed to Number
        required: true,
        min: [1, "Capacity must be at least 1"],
        max: [4, "Capacity seems too large"], // more flexible upper bound
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "bike", "auto", "e-rickshaw"],
        index: true,
      },
    },
    location: {
      lat: { // fixed typo: ltd -> lat
        type: Number,
        min: [-90, "Latitude must be between -90 and 90"],
        max: [90, "Latitude must be between -90 and 90"],
      },
      lng: {
        type: Number,
        min: [-180, "Longitude must be between -180 and 180"],
        max: [180, "Longitude must be between -180 and 180"],
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, transform(doc, ret) { delete ret.password; return ret; } },
    toObject: { virtuals: true, transform(doc, ret) { delete ret.password; return ret; } }
  }
);

// 2dsphere for location
captainSchema.index({ location: "2dsphere" });

// generate token
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

// compare password (make sure to select password when using this)
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method for password hashing
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// hash password pre-save
captainSchema.pre("save", async function (next) {
  const captain = this;
  if (!captain.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    captain.password = await bcrypt.hash(captain.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

const captainModel = mongoose.model("captain", captainSchema);

export default captainModel;
