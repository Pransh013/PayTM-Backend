import jwt from "jsonwebtoken";

const authMiddleWare = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      msg: "Unauthorized: Missing or invalid authentication token",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.userID;
    next();
  } catch (err) {
    return res.status(401).json({
      msg: "Invalid authentication token",
    });
  }
};

export default authMiddleWare;
