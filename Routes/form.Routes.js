import { Router } from "express";
import upload from "../Middlewares/multer.upload.js"
import { formFillingController, userDetailsController } from "../Controllers/form.Controller.js";
import userAuthChecker from "../Middlewares/auth.user.js";

const formRoutes = Router();

formRoutes.post("/create-user", upload.single("img"), formFillingController);
formRoutes.get("/get-all-user-details", userAuthChecker, userDetailsController);

export default formRoutes;