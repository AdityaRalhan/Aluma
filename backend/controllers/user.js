import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    occupation = "",
    age = null,
    gender = "",
    description = "",
    Physical_Activity = "",
    Current_Medication = "",
    trustedContacts = [],
  } = req.body;
  console.log("request")
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with provided details
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      occupation,
      age,
      gender,
      description,
      Physical_Activity,
      Current_Medication,
      trustedContacts,
    });

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: 'Signup failed', details: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user info:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    console.log("u are inside updateUserInfo controller");
    const userId = req.user._id || req.user.id;
    console.log("u are inside updateUserInfo controller ", userId);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const updates = { ...req.body };
    if ('password' in updates) {
      delete updates.password; // Do not allow password updates here
    }

    // Optionally validate trustedContacts is an array
    if (updates.trustedContacts && !Array.isArray(updates.trustedContacts)) {
      return res.status(400).json({ message: "trustedContacts must be an array" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user info:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};