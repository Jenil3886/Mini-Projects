import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../models/User.js";

export const getUsers = (req, res) => {
	getAllUsers((err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json(results);
	});
};

export const getUser = (req, res) => {
	const { id } = req.params;
	getUserById(id, (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		if (results.length === 0) return res.status(404).json({ error: "User not found" });
		res.json(results[0]);
	});
};

export const addUser = (req, res) => {
	const user = req.body;
	createUser(user, (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.status(201).json({ id: results.insertId, ...user });
	});
};

export const editUser = (req, res) => {
	const { id } = req.params;
	const user = req.body;
	updateUser(id, user, (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		if (results.affectedRows === 0) return res.status(404).json({ error: "User not found" });
		res.json({ id, ...user });
	});
};

export const removeUser = (req, res) => {
	const { id } = req.params;
	deleteUser(id, (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		if (results.affectedRows === 0) return res.status(404).json({ error: "User not found" });
		res.status(204).send();
	});
};
