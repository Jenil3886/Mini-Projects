import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import db from "./models/db.js"; // Import database connection
import userRoutes from "./routes/userRoutes.js"; // Import user routes
import { ROUTES, MESSAGES, CONFIG } from "./constants.js"; // Import constants

dotenv.config(); // Load environment variables

const app = express();
const port = CONFIG.PORT;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors({ origin: "http://localhost:5173" })); // Allow all origins by default

// Test database connection
db.connect((err) => {
	if (err) {
		console.error(`${MESSAGES.DB_CONNECTION_ERROR} ${err.message}`);
		process.exit(1); // Exit the process if the connection fails
	}
	console.log(MESSAGES.DB_CONNECTED);
});

// Use routes
app.use(ROUTES.USERS, userRoutes);

app.listen(port, () => {
	console.log(`${MESSAGES.SERVER_RUNNING} http://localhost:${port}`);
});
