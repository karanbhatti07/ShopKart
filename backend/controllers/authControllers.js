import User from "../models/User_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res) => {
  try {
    const { name, email, originalPassword, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered !",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name,
      password: hashedpassword,
      originalPassword: originalPassword,
      email: email,
    });
    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//####################################  L O G I N
// const SECRET_KEY = "KRI12345";
export const login = async (req, res) => {
  try {
    // const { name, password } = req.body;
    console.log(req.body);
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({
      // name: name,
      email,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      SECRET_KEY,
      {
        expiresIn: rememberMe ? "7d" : "1h",
      },
    );

    res.cookie("token1", token, {
      httpOnly: true,
      secure: false,
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token1");
    res.send("Logout Successfully");
  } catch (error) {
    console.log(error);
  }
};

export const profile = (req, res) => {
  const t = req.cookies.token1;

  console.log("Token:", t);
  if (!t) {
    return res.status(401).json({
      msg: "Token not found",
    });
  }

  try {
    const decode = jwt.verify(t, SECRET_KEY);
    console.log("Decoded:", decode);
    res.json({
      msg: "Token matched",
      userId: decode.id,
      role: decode.role,
    });
  } catch (error) {
    res.status(401).json({
      msg: "Invalid token",
      error: error.message,
    });
  }
};

export const AllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -originalPassword");
    res.status(200).json({
      message: "All Users Found",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const generateotp = Math.floor(Math.random() * 900000) + 100000;
    findUser.otp = generateotp;
    findUser.otpExpires = Date.now() + 10 * 60 * 1000;
    await findUser.save();

    res.status(200).json({
      message: " OTP Sent ",
      generateotp,
    });

  } catch (error) {
    console.log(error);
  }
};
