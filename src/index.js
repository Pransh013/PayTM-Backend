import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToDatabase from "./db.js";
import mainRouter from "./routes/main.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase();
app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
