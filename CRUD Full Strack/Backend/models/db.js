import mysql from "mysql";
import { CONFIG } from "../constants.js"; // Import constants

const db = mysql.createConnection({
	host: CONFIG.DB_HOST,
	user: CONFIG.DB_USER,
	password: CONFIG.DB_PASSWORD,
	database: CONFIG.DB_NAME,
});

export default db;
