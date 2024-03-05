import Account from "../../models/Account.js";

const accountDetailsController = async (req, res) => {
  const {
    query: { id },
  } = req;
  const account = await Account.findOne({ userID: id });
  res.json({ id: account._id });
};

export default accountDetailsController;
