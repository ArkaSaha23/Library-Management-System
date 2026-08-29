// import nodeMailer from "nodemailer";
// export const sendEmail = async ({ email, subject, message }) => {
//   //This creates a transporter. A transporter is the object that actually connects to the email server and sends mail.
//   const transporter = nodeMailer.createTransport({
//     //host: process.env.SMTP_HOST, //Gmail SMTP server
//     service: "gmail",//Tells Nodemailer to use Gmail
//     //port: process.env.SMTP_PORT,//Secure SMTP port
//     //secure:true,             
//     auth: {
//       user: process.env.SMTP_MAIL, //Sender email
//       pass: process.env.SMTP_PASSWORD,//Gmail app password
//     },
//   });

//   const emailSendingDetails = {
//     from: process.env.SMTP_MAIL, //sender email
//     to: email, //receiver email
//     subject,  //email subject
//     html: message,//email body written in HTML 
//   };
//   await transporter.sendMail(emailSendingDetails); //This line actually sends the email.
// };
// //createtransport() and sendMail() are the inbuilt method/function by NodeMailer

import { Resend } from "resend";

export const sendEmail = async ({ email, subject, message }) => {

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "Library Management System <onboarding@resend.dev>",
    to: [email],
    subject,
    html: message,
  });

  if (error) {
    console.error("RESEND EMAIL ERROR:", error);
    throw new Error(error.message);
  }

  console.log("Email sent successfully:", data);

  return data;
};