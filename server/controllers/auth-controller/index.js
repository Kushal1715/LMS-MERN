const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "user registered successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "email does not exist",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }

    const accessToken = jwt.sign(
      {
        _id: checkUser._id,
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
      },
      "JWT_SECRET",
      { expiresIn: "180m" }
    );

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: {
        accessToken,
        user: {
          id: checkUser._id,
          userName: checkUser.userName,
          email: checkUser.email,
          role: checkUser.role,
        },
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports = { registerUser, loginUser };
