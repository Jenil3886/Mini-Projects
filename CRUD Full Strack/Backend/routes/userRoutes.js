import express from "express";
import { getUsers, getUser, addUser, editUser, removeUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers); // Get all users
router.get("/:id", getUser); // Get user by ID
router.post("/", addUser); // Create a new user
router.put("/:id", editUser); // Update a user
router.delete("/:id", removeUser); // Delete a user

export default router;
