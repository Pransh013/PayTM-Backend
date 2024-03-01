import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/User.js";
import Account from "../../models/Account.js";

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  firstName: zod.string().trim().min(1),
  lastName: zod.string().trim().min(1),
});

const userSignupController = async (req, res) => {
  const {
    body: { username, password, firstName, lastName },
  } = req;

  //validating input body
  const { success } = signupSchema.safeParse({
    username,
    password,
    firstName,
    lastName,
  });

  if (!success) {
    return res.status(400).json({
      message: "Invalid request data",
    });
  }

  try {
    //checking if a user already exists with same username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating user in database
    const user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const userID = user._id;

    const minValue = 30000;
    const maxValue = 50000;
    const amount =
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

    await Account.create({
      userID,
      amount,
    });

    //creating a jwt token
    const token = jwt.sign({ userID }, process.env.JWT_SECRET);
    return res.json({
      message: "User created successfully",
      token,
    });
  } catch (err) {
    console.error("Error while creating user:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default userSignupController;
