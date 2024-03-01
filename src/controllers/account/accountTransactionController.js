import mongoose from "mongoose";
import Account from "../../models/Account.js";
import zod from "zod";

const accountTransactionSchema = zod.object({
  to: zod.string(),
  amount: zod.number().positive(),
});

const accountTransactionController = async (req, res) => {
  const {
    body: { to, amount },
    userID,
  } = req;

  const { success, error } = accountTransactionSchema.safeParse({to, amount})

  if (!success) {
    return res.status(400).json({ error: error.message });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const myAccount = await Account.findOne({ userID }).session(session);
    if (myAccount.amount < amount) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(403)
        .json({ message: "Request denied due to insufficient balance." });
    }

    const toAccount = await Account.findOne({
      userID: to,
    }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Account not found. Invalid input",
      });
    }

    await Account.updateOne(
      { userID },
      { $inc: { amount: -amount } },
      { session }
    );

    await Account.updateOne(
      { userID: to }, 
      { $inc: { amount } }, 
      { session });

    await session.commitTransaction();
    session.endSession();

    return res.json({
      msg: "Transfer Successfull",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default accountTransactionController;
