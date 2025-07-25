import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  about: String,
  tags: [String],
  joinedon: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);