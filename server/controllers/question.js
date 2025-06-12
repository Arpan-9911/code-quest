import Question from "../models/question.js";
import mongoose from "mongoose";

export const askQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const userId = req.userId;
  const postQuestion = new Question({ ...postQuestionData, userId })
  try {
    await postQuestion.save();
    res.status(200).json("Posted a question successfully");
    return
  } catch (error) {
    console.log(error)
    res.status(404).json("couldn't post a new question");
    return
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questionList = await Question.find().sort({ askedOn: -1 });
    res.status(200).json(questionList)
    return
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error.message });
    return
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  try {
    await Question.findByIdAndDelete(_id);
    res.status(200).json({ message: "successfully deletd..." })
  } catch (error) {
    res.status(404).json({ message: error.message });
    return
  }
};

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value } = req.body;
  const userId = req.userid;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  try {
    const question = await Question.findById(_id);
    const upindex = question.upvote.findIndex((id) => id === String(userId))
    const downindex = question.downvote.findIndex((id) => id === String(userId))
    if (value === "upvote") {
      if (downindex !== -1) {
        question.downvote = question.downvote.filter((id) => id !== String(userId))
      }
      if (upindex === -1) {
        question.upvote.push(userId);
      } else {
        question.upvote = question.upvote.filter((id) => id !== String(userId))
      }
    } else if (value === "downvote") {
      if (upindex !== -1) {
        question.upvote = question.upvote.filter((id) => id !== String(userId))
      }
      if (downindex  === -1) {
        question.downvote.push(userId);
      } else {
        question.downvote = question.downvote.filter((id) => id !== String(userId))
      }
    }
    await Question.findByIdAndUpdate(_id, question);
    res.status(200).json({ message: "voted successfully.." })

  } catch (error) {
    res.status(404).json({ message: "id not found" });
    return
  }
}