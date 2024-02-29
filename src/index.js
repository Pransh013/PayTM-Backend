import express from "express";
import "dotenv/config";
import connectToDatabase from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase();
app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
