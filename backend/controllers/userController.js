import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(uri, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    await client.connect();
  }
}

async function signup(req, res) {
  const { username, password, email } = req.body;

  try {
    await connectClient();
    console.log("connect to db");
    const db = client.db("anshgithub");
    // const userCollection = db.collection("users");

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User( {
      userName: username,
      password: hashedPassword,
      email : email,
      repositories: [],
      followedUsers: [],
      starsRepo: [],
    });

    const result = await newUser.save();

    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SERCET_KEY,
      { expiresIn: "1h" },
    );
    // res.json({ token });
    return res.status(200).json({ message: "User created successfully", token : token });

  } catch (err) {
    console.error("Error during signup: ", err.message);
    return res.status(500).send("Server Error");
  }
}

const login = (req, res) => {
  res.send("Logging in!");
};

const getAllUsers = (req, res) => {
  res.send("All users fetched!");
};

const getUserProfile = (req, res) => {
  res.send("Profile fetched!");
};

const updateUserProfile = (req, res) => {
  res.send("Profile updated!");
};

const deleteUserProfile = (req, res) => {
  res.send("Profile Delete!");
};

export  {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
