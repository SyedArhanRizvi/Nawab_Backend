import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Resolve `__dirname` in ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, "../Public/Temp");
    console.log("Upload Path:", uploadPath); // Debugging path
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${Date.now()}-${file.originalname}`;
    console.log("Generated Filename:", uniqueFilename); // Debugging filename
    cb(null, uniqueFilename);
  },
});

const fileFilter = (req, file, cb) => {
  console.log("File Received:", file); // Debugging file info
  if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG files are allowed"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 }, // 500 KB file size limit
  fileFilter,
});

export default upload;
