import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const allowedOrigins = [
    "http://localhost:5173", // Dev
    "", // Prod
];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(express.json());

app.use("/api", apiRoutes);

// Serve dubbed videos statically
app.use("/dubbed", express.static("dubbed"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));