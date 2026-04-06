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
  edition:{
    type:String,
    trim:true,
    default:"1st Edition",
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  category: {
    type: String,
    required:true,
  },

  language: {
    type: String,
    default: "English",
    required:true,
  },
  AddedDate:{
    type:Date,
    default:Date.now(),
  },

  quantityAvailable:{
    type:Number,
    required:true,
  },
  shelfLocation:{
    type:String,
    trim:true,
  },

  coverImage: {
    type: String, // URL (Cloudinary / storage)
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