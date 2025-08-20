import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import User from "./models/User.js";
import Item from "./models/Item.js";
import authRoutes from "./routes/auth.route.js";
import itemRoutes from "./routes/items.route.js";

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000


app.use("/api/auth" , authRoutes)
app.use("/api/items" , itemRoutes)

app.get("/api/health", (req, res) => res.json({ ok: true }));

async function startServer() {
    try {
        
        await sequelize.authenticate();
        console.log("Database connected successfully");

        await sequelize.sync();
        console.log("Database synced successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
        
    }
}

startServer()