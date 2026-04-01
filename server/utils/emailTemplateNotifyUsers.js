import calculateFine from "./calculateFine.js";

export function notifyUserAfterDueDateEmailTemplate(borrow,bookName) {
  return `
    <div style="font-family: Helvetica, Arial, sans-serif; background-color: #f4f4f7; padding: 40px 20px; color: #333;">
      
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        
        <div style="background-color: #2563eb; padding: 20px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px;">Book Return Reminder</h1>
        </div>

        <div style="padding: 30px; line-height: 1.6;">
          <p>Dear <strong>${borrow.user.name}</strong>,</p>
          
          <p>
            The book <strong>"${bookName}"</strong> was due on 
            <strong>${new Date(borrow.dueDate).toDateString()}</strong>.
          </p>

          <p style="color: #b91c1c;">
            You are now overdue. Please return it as soon as possible.If you have already returned the book please ignore this mail
          </p>

          <p>
            Late fine: <strong>₹${calculateFine(borrow.dueDate,new Date())}</strong>
          </p>

          <p>Regards,<br/><strong>ShelfSync</strong></p>
        </div>

      </div>
    </div>
  `;
}

export function notifyUserBeforeDueDateEmailTemplate(borrow,bookName){
    return(`
    <div style="font-family: Helvetica, Arial, sans-serif; background-color: #f4f4f7; padding: 40px 20px; color: #333;">
      
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        
        <div style="background-color: #2563eb; padding: 20px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px;">Book Return Reminder</h1>
        </div>

        <div style="padding: 30px; line-height: 1.6;">
          <p>Dear <strong>${borrow.user.name}</strong>,</p>
          
          <p>
            The book <strong>"${bookName}"</strong> is due on 
            <strong>${new Date(borrow.dueDate).toDateString()}</strong>.
          </p>

          <p style="color: #b91c1c;">
            Please return it before the due date inorder to avoid the accumulated late fees.If you have already returned the book please ignore this mail
          </p>

          <p>Regards,<br/><strong>ShelfSync</strong></p>
        </div>

      </div>
    </div>`
    );
}