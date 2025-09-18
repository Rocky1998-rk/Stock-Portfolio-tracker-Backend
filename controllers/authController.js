import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

//........................ Token generate.....................
const genToken = ( id ) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn:  "3d" });
}


//........................ Register Api Controller .....................

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message:"Register Successfully", token: genToken(user._id), user: { id: user._id, username, email },});

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};



//..............................login Api Controller....................

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "login Successfully",token: genToken(user._id), user: { id: user._id, username: user.username, email },
    });
    
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
