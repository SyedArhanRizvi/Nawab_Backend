import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+@.+\..+/, "Please Enter a valid email address"],
    },
    mobile: {
      type: Number,
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Please Enter a valid mobile number"],
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
    password:{
      type:String,
      required:true
    },
    file: {
      type: String,
      required: true,
      // validator: {
      //   validate: function (img) {
      //     return img.match(/\.(jpeg)$i/);
      //   },
      // },
    },
  },
  { timestamps: true }
);

export const FormModel = mongoose.model("FormModel", formSchema);
