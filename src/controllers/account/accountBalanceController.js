import Account from "../../models/Account.js";

const accountBalanceController = async (req, res) => {
  const { userID } = req;
  const account = await Account.findOne({ userID });
  const amount = account.amount;
  res.json({ amount });
};

export default accountBalanceController;
