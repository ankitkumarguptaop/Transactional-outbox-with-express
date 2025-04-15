import { transporter } from "../configs/mail";

import path from "path";

const fs = require("fs");

export const sendMail = async (payload: any) => {
  try {
    const {
      email,
      name,
      place,
      timing,
      totalTickets,
      eventName,
      ticket_price,
    } = payload.body;
    console.log("✌️payload.body --->", payload.body);

    let html = fs.readFileSync(path.join("src/mail.html"), "utf-8");

    html = html.replace("[NUMBER]", totalTickets);
    html = html.replace("[NAME]", name);
    html = html.replace("[TIME]", timing);
    html = html.replace(
      "[TOTAL]",
      parseInt(totalTickets) * parseInt(ticket_price)
    );
    html = html.replace("[PLACE]", "Chandigarh");
    html = html.replace("[EVENT_NAME]", eventName);

    var mailOptions = {
      from: "ankitkumarguptademo@gmail.com",
      to: payload.body,
      subject: "Ticket are confirm",
      html: html,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
