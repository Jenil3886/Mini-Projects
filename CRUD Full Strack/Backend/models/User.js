import db from "./db.js";

export const getAllUsers = (callback) => {
	const query = "SELECT * FROM users";
	db.query(query, callback);
};

export const getUserById = (id, callback) => {
	const query = "SELECT * FROM users WHERE id = ?";
	db.query(query, [id], callback);
};

export const createUser = (user, callback) => {
	const query = "INSERT INTO users SET ?";
	db.query(query, user, callback);
};

export const updateUser = (id, user, callback) => {
	const query = "UPDATE users SET ? WHERE id = ?";
	db.query(query, [user, id], callback);
};

export const deleteUser = (id, callback) => {
	const query = "DELETE FROM users WHERE id = ?";
	db.query(query, [id], callback);
};
