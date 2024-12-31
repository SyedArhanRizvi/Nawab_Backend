import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const cloudinaryUpload = async (filePath) => {
  try {
    const uploadedImgUrl = await cloudinary.v2.uploader.upload(filePath);
    return uploadedImgUrl.url;
  } catch (error) {
    console.log(
      "There are some errors in your cloudinary uploads plz fix the bug first ",
      error
    );
  }
};
export default cloudinaryUpload;
