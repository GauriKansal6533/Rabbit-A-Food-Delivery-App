import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Automatically trims any extra spaces from the email.
      lowercase: true, // Converts email to lowercase for consistency.
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true }
);

// Create an index for better email search performance, as it's unique
userSchema.index({ email: 1 }, { unique: true });

const userModel = mongoose.model("user", userSchema);

export default userModel;
