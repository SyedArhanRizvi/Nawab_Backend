import jwt from "jsonwebtoken";

const userAuthChecker = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Error in userAuthChecker middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default userAuthChecker;
