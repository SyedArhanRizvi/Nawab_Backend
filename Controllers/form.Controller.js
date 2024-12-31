import { FormModel } from "../Models/form.Model.js";
import passwordHasher from "../Utils/bcrypt.hash.js";
import cloudinaryUpload from "../Utils/cloudinary.js";
import createWebToken from "../Utils/jwt.token.js";

export const formFillingController = async (req, res) => {
  const { name, message, mobile, email, password } = req.body;
  const img = req.file?.path || null;

  try {
    if (!name || !message || !mobile || !email || !img || !password) {
      console.log("Missing fields:", { name, message, mobile, email, img });
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const hashedP = await passwordHasher(password);
    const file = await cloudinaryUpload(img);
    const savedDetails = await FormModel.create({
      name,
      message,
      mobile,
      email,
      password:hashedP,
      file,
    });
    createWebToken(res, savedDetails._id);
    return res
      .status(201)
      .json({ message: "Form has been successfully submitted" });
  } catch (error) {
    console.log(
      "There are some errors in your formFillingController plz fix the bug first ",
      error
    );
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};

export const userDetailsController = async (req, res)=>{
  const userID = req.user?._id;
  try {
    const userDetails = await FormModel.findById({userID});
    return res.status(200).json({userDetails});
  } catch (error) {
    console.log(
      "There are some errors in your formFillingController plz fix the bug first ",
      error
    );
    return res.status(500).json({ message: "Internal Server Errors" });
  }
}