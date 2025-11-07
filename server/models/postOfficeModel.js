import mongoose from "mongoose";

const postOfficeSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
  },
  officename: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
});

export const PostOffice = mongoose.model("PostOffice", postOfficeSchema);


