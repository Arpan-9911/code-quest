import express from "express";
import { signUp, login } from "../controllers/auth.js";
import { getAllUsers, updateProfile } from '../controllers/users.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

router.get('/getAllUsers', getAllUsers)

router.patch("/update/:id", auth, updateProfile);

export default router;