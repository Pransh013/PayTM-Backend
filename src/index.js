import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToDatabase from "./db.js";
import mainRouter from "./routes/main.js";

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDatabase();
    console.log("Successfully connected to MongoDB"); 
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error("Error starting server:", err);
  }
}
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", mainRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).send(message);
});

startServer();

export default app;