import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/User.js";

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const userSigninController = async (req, res) => {
  const {
    body: { username, password },
  } = req;

  // validating input body
  const { success } = signinSchema.safeParse({ username, password });
  if (!success) {
    return res.status(400).json({
      message: "Invalid request data",
    });
  }

  // checking if user exists or not
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  // comparing input password with hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const userID = user._id;
  const token = jwt.sign({ userID }, process.env.JWT_SECRET);
  return res.json({
    message: "Logged in successfully",
    token,
  });
};

export default userSigninController;
