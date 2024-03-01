import User from "../../models/User.js";

const userSearchController = async (req, res) => {
  const {
    query: { filter },
  } = req;

  if (!filter) filter = "";

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
  return res.json({ users });
};

export default userSearchController;
