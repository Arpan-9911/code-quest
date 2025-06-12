import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import questionRoutes from "./routes/question.js";
import answerRoutes from "./routes/answer.js";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/question", questionRoutes);
app.use("/answer", answerRoutes);
app.get("/", (req, res) => {
  res.send("Hello from server");
});

const PORT = process.env.PORT || 5000;
const database_url = "mongodb+srv://arpanks1263:codeQuest@codequest.gqpzt9l.mongodb.net/?retryWrites=true&w=majority&appName=CodeQuest"

mongoose.connect(database_url)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));