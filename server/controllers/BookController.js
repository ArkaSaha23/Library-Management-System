import express from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { UserDataSchema } from "../models/userModels.js";
import { BookData } from "../models/bookModel.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const addBook = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    author,
    description,
    price,
    category,
    language,
    quantityAvailable,
    publisher,
    publishedYear,
    pages,
  } = req.body;
  if (
    !title ||
    !author ||
    !description ||
    !price ||
    !category ||
    !language ||
    !quantityAvailable ||
    !publisher ||
    !publishedYear ||
    !pages
  ) {
    return next(new ErrorHandler("Please fill all the details", 400));
  }
  const bookdata = await BookData.create({
    title,
    author,
    description,
    price,
    category,
    language,
    quantityAvailable,
    publisher,
    publishedYear,
    pages,
  });
  console.log(bookdata);
  res.status(201).json({
    success: true,
    message: "Book is Added successfully",
    bookdata,
  });
});

export const getAllBook = catchAsyncErrors(async (req, res, next) => {
  const books = await BookData.find();
  res.status(200).json({
    success: true,
    message: "These are the list of books",
    books,
  });
  console.log(books);
});

// export const updateBook = catchAsyncErrors(async (req, res, next) => {
//   try {
//   } catch (err) {
//     return next(new ErrorHandler(err, 500));
//   }
// });

export const deleteBook = catchAsyncErrors(async (req, res, next) => {
  //get the id of the book you want to delete
  const id = req.params.id;
  const book = await BookData.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404)); //For missing data, better is:404
  }
  const deletedBook = await book.deleteOne();
  console.log(deletedBook);
  res.status(200).json({
    status: true,
    message: "Book deleted successully",
    deletedBook,
  });
});
