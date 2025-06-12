import mongoose from "mongoose";
import User from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedon: user.joinedon,
      })
    })
    res.status(200).json(allUserDetails);
    return
  } catch (error) {
    res.status(404).json({ message: error.message });
    return
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No user with that id");
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, about, tags },
      { new: true }
    );
    res.status(200).json(updatedUser);
    return
  } catch (error) {
    res.status(404).json({ message: error.message });
    return
  }
};