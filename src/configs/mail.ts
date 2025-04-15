 
const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ankitkumarguptademo@gmail.com",
    pass: "okyc sjau tqdo tsls",
  },
});