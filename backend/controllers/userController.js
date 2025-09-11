import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register User
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  console.log("Register Request:", { name, email, password });

  try {
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.json({ success: false, message: "Weak Password" });
    }

    const exists = await userModel.findOne({ email });
    console.log("User Found in DB:", exists);

    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Request:", { email, password });

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

export { loginUser, registerUser };
