import zod from "zod";
import User from "../../models/User.js";
const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

const userUpdateController = async (req, res) => {
  const { body } = req;

  const { success } = updateSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({ message: "Please provide valid data." });
  }
  try {
    await User.updateOne({ _id: req.userID }, body);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.json({ message: "Some error occured" });
  }
};

export default userUpdateController;
