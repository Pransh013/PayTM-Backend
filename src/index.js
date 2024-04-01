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
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", mainRouter);

app.use((error, req, res, next) => {
  res.status(500).send({error: 'Internal Server Error'});
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
