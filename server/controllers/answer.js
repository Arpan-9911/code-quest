import mongoose from "mongoose";
import Question from "../models/question.js";

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  await updateNoOfQuestion(_id, noOfAnswers);
  try {
    const updateQuestion = await Question.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
    });
    res.status(200).json(updateQuestion);
  } catch (error) {
    res.status(404).json({ message: "error in uploading" });
    return;
  }
};
const updateNoOfQuestion = async (_id, noOfAnswers) => {
  try {
    await Question.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, noOfAnswers } = req.body;
  // console.log(_id,answerid,noofanswers)
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("answer unavailable...");
  }
  await updateNoOfQuestion(_id, noOfAnswers);
  try {
    await Question.updateOne({ _id }, { $pull: { answer: { _id: answerId } } });
    res.status(200).json({ message: "successfully deleted.." });
  } catch (error) {
    res.status(404).json({ message: "error in deleting.." });
    return;
  }
};
