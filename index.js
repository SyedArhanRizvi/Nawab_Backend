import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import formRoutes from "./Routes/form.Routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  })
);

mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Your DB has connected successfully on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
});
app.use("/server/form-routes", formRoutes)