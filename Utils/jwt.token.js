import jwt from "jsonwebtoken";
import dot from "dotenv";
dot.config();

const createWebToken = (res, userId) => {
  try {
    const secretKey = process.env.JWT_KEY;
    const payload = { id: userId };
    const options = { expiresIn: "1h" }; 
    const token = jwt.sign(payload, secretKey, options);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 60 * 60 * 1000,
      sameSite: "strict", 
    });
    res.status(200).json({ message: "Token created and set as cookie!" });
  } catch (error) {
    console.error("Error creating token:", error);
    res.status(500).json({ error: "Failed to create token" });
  }
};

export default createWebToken;
