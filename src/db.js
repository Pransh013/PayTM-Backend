import mongoose from "mongoose";

const connectToDatabase = () => {
  mongoose.connect(process.env.MONGO_URI);

  const db = mongoose.connection;

  db.on("error", (err) => console.log(err));
  db.once("open", () => console.log("Connected to MongoDB"));
};

export default connectToDatabase;
