const User = require("../models/user");

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const userDetails = req.body;

    const userWithSameEmail = await User.findOne({ email: userDetails.email });
    if (userWithSameEmail) {
      return res.status(409).json({
        error:
          "This email is already registered, please enter a unique email id",
      });
    }

    const userWithSameUsername = await User.findOne({
      username: userDetails.username,
    });
    if (userWithSameUsername) {
      return res.status(409).json({
        error:
          "This username is already present, please enter a unique username",
      });
    }

    let newUser = new User(userDetails);

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(userDetails.password, salt);
    const savedUser = await newUser.save();
    res.json({
      _id: savedUser._id,
      name: savedUser.firstName + " " + savedUser.lastName,
      email: savedUser.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to save the user",
      errorMessage: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const loginDetails = req.body;
    let user = await User.findOne({ email: loginDetails.email }).select(
      "firstName lastName username email password createdAt"
    );
    if (!user) {
      return res.status(401).json({ error: "User is not registered" });
    }
    const isPasswordValid = await bcrypt.compare(
      loginDetails.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "24h",
    });

    user.password = undefined;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({
      message: "Unable to login for the user",
      errorMessage: error.message,
    });
  }
};

exports.isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized access, please login" });
  }
};
