import { urlencoded } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { BookData } from "../models/bookModel.js";
import { BorrowData } from "../models/borrowModel.js";
import { UserDataSchema } from "../models/userModels.js";

//Issue book to user(User want this book)
// export const borrowBook = catchAsyncErrors(async (req, res, next) => {
//   console.log("STEP 1: Controller started");
//   const id = req.params.id;
//   const email = req.body.email;

//   console.log(email)
//   console.log(id)
//   //finding the book user wants to borrow
//   const bookWantsToBorrow = await BookData.findById(id);
//   console.log(bookWantsToBorrow)
//   if (!bookWantsToBorrow) {
//     return next(new ErrorHandler("Book not found", 400));
//   }

//   //finding the user
//   const curUser = await UserDataSchema.findOne({email});
//    console.log("STEP 4: User fetched");
//   if (!curUser) {
//     return next(new ErrorHandler("User Not found", 400));
//   }

//   //check if the book's quantity is available
//   if (bookWantsToBorrow.quantityAvailable === 0) {
//     return next(new ErrorHandler("Book is currently Unavailable"));
//   }

//   //check if that book is already borrowed by user or not//
//   // (he/she not borrow the same book twice at the same time)
//   const bookalreadyBorrowedByUser = curUser.booksBorrowed.find(
//     (b) => b.bookID.toString() === id && b.hasReturned === false,
//   );
//   if (bookalreadyBorrowedByUser) {
//     return next(new ErrorHandler("Book is already Borrowed", 400));
//   }

//   bookWantsToBorrow.quantityAvailable =  bookWantsToBorrow.quantityAvailable - 1;
//   bookWantsToBorrow.isFree = (bookWantsToBorrow.quantityAvailable > 0)? true : false;
//   await bookWantsToBorrow.save();

//   //pushing the book into user.borrowedBooks
//   curUser.booksBorrowed.push({
//     bookID : bookWantsToBorrow._id,
//     bookTitle : bookWantsToBorrow.title,
//     borrowedDate :new Date(),
//     Duedate : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
//     hasReturned:false,
//   })
//   await curUser.save();

//   await BorrowData.create({
//     user:{
//       id : curUser.id,
//       name : curUser.name,
//       email : curUser.email,
//     },
//     book : bookWantsToBorrow._id,
//     price : bookWantsToBorrow.price,
//     borrowedDate : new Date(),
//     dueDate : new Date.now() + 14 * 24 * 60 * 60 * 1000,
//   });
//   res.status(200).json({
//     success:true,
//     message:"Borrowed book recorded successfully",
//   });
// });
export const borrowBook = catchAsyncErrors(async (req, res, next) => {
  console.log("STEP 1: Controller started");

  const id = req.params.id;
  const email = req.body.email;

  const bookWantsToBorrow = await BookData.findById(id);
  if (!bookWantsToBorrow) {
    return next(new ErrorHandler("Book not found", 400));
  }

  const curUser = await UserDataSchema.findOne({ email });
  if (!curUser) {
    return next(new ErrorHandler("User Not found", 400));
  }

  if (bookWantsToBorrow.quantityAvailable === 0) {
    return next(new ErrorHandler("Book is currently Unavailable", 400));
  }

  const borrowedBooks = curUser.booksBorrowed || [];

  const alreadyBorrowed = borrowedBooks.find(
    (b) => b.bookID.toString() === id && b.hasReturned === false
  );

  if (alreadyBorrowed) {
    return next(new ErrorHandler("Book is already Borrowed", 400));
  }

  // dates
  const borrowedDate = new Date();
  const dueDate = new Date(borrowedDate.getTime() + 14 * 24 * 60 * 60 * 1000);

  // update book
  bookWantsToBorrow.quantityAvailable -= 1;
  bookWantsToBorrow.isFree = bookWantsToBorrow.quantityAvailable > 0;
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
export const returnBook = catchAsyncErrors(async (req, res, next) => {});

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
