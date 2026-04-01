import cron from "node-cron";
import { BorrowData } from "../models/borrowModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { notifyUserAfterDueDateEmailTemplate, notifyUserBeforeDueDateEmailTemplate } from "../utils/emailTemplateNotifyUsers.js";
import { BookData } from "../models/bookModel.js";

export const notifyUsersOneDayAgo = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("scheduling");
    try {
      const startTomorrowTime = new Date(); 
      startTomorrowTime.setDate(startTomorrowTime.getDate() + 1);
      startTomorrowTime.setHours(0,0,0,0);

      const endTomorrowTime = new Date(startTomorrowTime);
      endTomorrowTime.setHours(23,59,59,999);

      const listOfCurrentBorrowers = await BorrowData.find({
        dueDate:{ $gte : startTomorrowTime,
          $lte:endTomorrowTime,
         },
         returnDate:null,
         notifiedBeforeDueDate:false,
      })

      for (const borrow of listOfCurrentBorrowers) {
        if (borrow.user && borrow.user.email) {

          const book = await BookData.findById(borrow.book);

          await sendEmail({
            email: borrow.user.email,
            subject: "Book Return Reminder",
            message: notifyUserBeforeDueDateEmailTemplate(borrow, book.title),
          });
          borrow.notifiedBeforeDueDate = true;
          await borrow.save();
        }
        console.log(`Email sent succesfully to ${borrow.user.name}`);
      }
    } catch (error) {
      console.log("Some Error occured while notifying users", error);
    }
  });
};

export const notifyUsersAfterDueDate = () => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const now = new Date();
      const onedayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const listOfBorrowers = await BorrowData.find({
        dueDate: { $lt: onedayAgo },
        returnDate: null,
      });

      for (const borrow of listOfBorrowers) {
        if (borrow.lastNotifiedAt) {
          const last = new Date(borrow.lastNotifiedAt);

          const isSameDay =
            last.getDate() === now.getDate() &&
            last.getMonth() === now.getMonth() &&
            last.getFullYear() === now.getFullYear();

          if (isSameDay) {
            continue; // skip (already emailed today)
          }
        }

        const book = await BookData.findById(borrow.book);
        console.log(book.title);
        if (borrow.user && borrow.user.email) {
          await sendEmail({
            email: borrow.user.email,
            subject: "Book Return Reminder",
            message: notifyUserAfterDueDateEmailTemplate(borrow, book.title),
          });

          // Update last notified time
          borrow.lastNotifiedAt = new Date();
          await borrow.save();
        }
        console.log(`Email sent succesfully to ${borrow.user.name}`);
      }
    } catch (error) {
      console.log("Some Error occured while notifying users", error);
    }
  });
};
