import mongoose from "mongoose";
const BookSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true
  },
  author:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true
  },
  category: {
    type: String,
  },

  language: {
    type: String,
    default: "English",
  },
  quantityAvailable:{
    type:Number,
    required:true,
  },

  coverImage: {
    type: String, // URL (Cloudinary / storage)
  },

  fileType: {
    type: String,
    enum: ["pdf", "epub", "doc"],
    default: "pdf",
  },

  fileSize: {
    type: Number, // in KB/MB
  },

  pages: {
    type: Number,
  },

  publisher: {
    type: String,
  },

  publishedYear: {
    type: Number,
  },

  isFree: {
    type: Boolean,
    default: true,
  },
},
{
    timestamps:true,
});
export const BookData = mongoose.model("Book",BookSchema);
//modelName="Book"