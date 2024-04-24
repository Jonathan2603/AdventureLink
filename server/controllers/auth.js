const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");

const register = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(404).json({ message: "Email already exists" });
    }

    // Check if the username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    // Check if the username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(404).json({ message: "Username already exists" });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      bio,
    });

    res.status(200).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      bio: newUser.bio,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const isValidUser = await bcrypt.compare(password, user.password);
    if (!isValidUser) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = { register, login };
