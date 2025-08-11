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
      sparse: true, // This automatically creates a sparse index
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
      type: {
        type: String,
        enum: ['Point'],
        required: false
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: false, // Will be set when captain goes online
        validate: {
          validator: function(coords) {
            // Allow undefined for offline captains
            if (coords === undefined || coords === null) return true;
            // If coordinates exist, they must have exactly 2 elements
            if (!Array.isArray(coords) || coords.length !== 2) return false;
            const [lng, lat] = coords;
            return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
          },
          message: 'Invalid coordinates format. Expected [longitude, latitude]'
        }
      },
      // Keep legacy lat/lng for backward compatibility
      lat: {
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

// Create sparse 2dsphere index for GeoJSON location (only for documents with coordinates)
captainSchema.index({ "location.coordinates": "2dsphere" }, { sparse: true });

// Additional indexes for better performance
captainSchema.index({ status: 1, "location.coordinates": "2dsphere" }, { sparse: true });
// Note: socketId index is automatically created by sparse: true in schema definition

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
