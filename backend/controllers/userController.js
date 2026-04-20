import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";


const signup = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // await connectClient();
    // const db = client.db("anshgithub");
    // const userCollection = db.collection("users");

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User ({
      userName: username,
      password: hashedPassword,
      email : email,
      repositories: [],
      followedUsers: [],
      starsRepo: [],
    });

    const result = await newUser.save();
    // const result = await userCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SERCET_KEY,
      { expiresIn: "1h" },
    );
    // res.json({ token, userId: result.insertId });
    return res.status(200).json({ message: "User created successfully", token : token });

  } catch (err) {
    console.error("Error during signup: ", err.message);
    return res.status(500).send("Server Error");
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credential!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({ message: "Invalid credential!" });
    }


    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SERCET_KEY,
      { expiresIn: "1h" },
    );

    return res.status(200).json({ message: "User logged in successfully", token: token});

  } catch (error) {
    console.error("Error during login: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users= await User.find({});

    return res.status(200).json(users);
    
  } catch (error) {
    console.error("Error during finding user: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const getUserProfile = async (req, res) => {
  const currentID = req.params.id;
   try {
    const user = await User.findOne({
      _id: currentID,
    });

    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }
    
    return res.json({user});

   } catch (error) {
    console.error("Error during finding by id: ", error.message);
    return res.status(500).send("Server Error!");
   }

};

const updateUserProfile = async (req, res) => {
  const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    let updateFields = { email };

    if(password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const result = await User.findOneAndUpdate({
      _id: currentID,
    }, 
    { $set: updateFields },
    { new: true }
  );

  if(!result){
    return res.status(404).json({ message: "user not found!" });
  }

  return res.status(200).json(result);
    
  } catch (error) {
    console.error("Error during Updated: ", error.message);
    return res.status(500).send("Server Error!");
  }

};

const deleteUserProfile = async (req, res) => {
  const currentID = req.params.id;

  try {
    const result = await User.deleteOne({
      _id: currentID,
    });

    if(result.deletedCount == 0){
      return res.status(404).json({ message: "user not found!" });
    }
    
    return res.json({message: "user profile deleted!"});

  } catch (error) {
    console.error("Error during deleting: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

export  {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
