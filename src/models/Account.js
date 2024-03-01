import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
export default Account;
