import User from "../../models/User.js";

const userSearchController = async (req, res) => {
  const filter = req.query.filter || "";
  const regexPattern = new RegExp(filter, "i");

  const queryFilter = {
    $or: [
      {
        firstName: {
          $regex: regexPattern,
        },
      },
      {
        lastName: {
          $regex: regexPattern,
        },
      },
    ],
  };

  const users = await User.find(queryFilter);
  const filteredUsers = users.filter(user => user._id != req.userID)
  return res.json({ filteredUsers });
};

export default userSearchController;
