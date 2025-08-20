export const ROUTES = {
	USERS: "/api/users",
};

export const MESSAGES = {
	DB_CONNECTED: "Connected to the MySQL database.",
	DB_CONNECTION_ERROR: "Error connecting to the database:",
	SERVER_RUNNING: "Server is running on",
};

export const CONFIG = {
	PORT: process.env.PORT || 3000,
	DB_HOST: process.env.DB_HOST || "localhost",
	DB_USER: process.env.DB_USER || "root",
	DB_PASSWORD: process.env.DB_PASSWORD || "Admin@123",
	DB_NAME: process.env.DB_NAME || "crud_db",
};
