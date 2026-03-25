import { urlencoded } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { BookData } from "../models/bookModel.js";
import { BorrowData } from "../models/borrowModel.js";
import { UserDataSchema } from "../models/userModels.js";
import calculateFine from "../utils/calculateFine.js";

//Issue book to user(User want this book)
export const borrowBook = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id; //gtting the id of the book he wants to borrow
  const email = req.body.email;

  const bookWantsToBorrow = await BookData.findById(id);
  if (!bookWantsToBorrow) {
    return next(new ErrorHandler("Book not found", 400));
  }

  const curUser = await UserDataSchema.findOne({
    email,
    accountVerified: true,
  });
  if (!curUser) {
    return next(new ErrorHandler("User Not found", 400));
  }

  if (bookWantsToBorrow.quantityAvailable === 0) {
    return next(new ErrorHandler("Book is currently Unavailable", 400));
  }

  const borrowedBooks = curUser.booksBorrowed; //will get the array booksBorrowed from userModel

  const alreadyBorrowed = borrowedBooks.find(
    (b) => b.bookID.toString() === id && b.hasReturned === false,
  );
  //ifthe book is already borrowed by the user he cant borrow for the 2nd time
  if (alreadyBorrowed) {
    return next(new ErrorHandler("Book is already Borrowed", 400));
  }

  // dates
  const borrowedDate = new Date();
  const dueDate = new Date(borrowedDate.getTime() + 14 * 24 * 60 * 60 * 1000);

  // update book
  bookWantsToBorrow.quantityAvailable -= 1;
  bookWantsToBorrow.isFree =
    bookWantsToBorrow.quantityAvailable > 0 ? true : false;
  await bookWantsToBorrow.save();

  // update user
  curUser.booksBorrowed.push({
    bookID: bookWantsToBorrow._id,
    bookTitle: bookWantsToBorrow.title,
    borrowedDate,
    Duedate: dueDate,
    hasReturned: false,
  });
  await curUser.save();

  // create borrow record
  await BorrowData.create({
    user: {
      id: curUser._id,
      name: curUser.name,
      email: curUser.email,
    },
    book: bookWantsToBorrow._id,
    price: bookWantsToBorrow.price,
    borrowedDate,
    dueDate,
  });

  res.status(200).json({
    success: true,
    message: "Borrowed book recorded successfully",
  });
});

//return a book
export const returnBook = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id; //GETTING THE BOOK USER WANTS TO RETURN
  const email = req.body.email;

  //GETTING THE BOOK DATABASE
  const bookWantsToReturn = await BookData.findById(id);
  if (!bookWantsToReturn) {
    return next(new ErrorHandler("Book not found", 400));
  }

  //GETTING THE USER FROM USER DATABASE
  const curUser = await UserDataSchema.findOne({
    email,
    accountVerified: true,
  });
  if (!curUser) {
    return next(new ErrorHandler("User Not found", 400));
  }

  //CHECK IF THE USER BORROWED THE BOOK AT ALL
  const ListOfborrowedBooks = curUser.booksBorrowed;
  console.log(ListOfborrowedBooks);
  const returningBook = ListOfborrowedBooks.find(
    (b) => b.bookID.toString() === id && b.hasReturned === false,
  );
  if (!returningBook) {
    return next(new ErrorHandler("You have not Borrowed this Book", 400));
  }

  //UPDATE THE BOOK DATABASE
  bookWantsToReturn.quantityAvailable += 1;
  bookWantsToReturn.isFree =
    bookWantsToReturn.quantityAvailable > 0 ? true : false;
  await bookWantsToReturn.save();

  //UPDATE THE BOOKS-BORROWED FROM USER DATABASE
  returningBook.hasReturned = true;
  await curUser.save();

  //UPDATE THE BORROW DATABASE
  const borrow = await BorrowData.findOne({
    book: id,
    "user.email": email,
    returnDate: null,
  });
  if (!borrow) {
    return next(new ErrorHandler("You have not Borrowed this Book", 400));
  }
  borrow.returnDate = new Date();

  //CHECK FOR FINE CALCULATION
  borrow.fine = calculateFine(borrow.dueDate, borrow.returnDate);
  await borrow.save();
  res.status(200).json({
    success: true,
    message:
      borrow.fine === 0
        ? `The book has been returned successfully.Total charges are ${bookWantsToReturn.price}`
        : `The book has been returned successfully.Total charges including the late fine are ${bookWantsToReturn.price + borrow.fine}`,
  });
});

//renew a book for a user
export const renewBook = catchAsyncErrors(async (req, res, next) => {});

//all books currently issued(Not returned) //ADMIN
export const getAllBorrowedBooks = catchAsyncErrors(
  async (req, res, next) => {},
);

//book borrowed by a specific user //ADMIN
export const getBorrowedBookByuser = catchAsyncErrors(
  async (req, res, next) => {},
);
