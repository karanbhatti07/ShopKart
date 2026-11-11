import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token1;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized Access",
    });
  }
};
