// emailService.js
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../HelperConstants/adminAccount");

const sendingEmail = (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  const message = {
    from: EMAIL,
    to,
    subject,
    html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error) => {
      if (error) {
        console.error(error);
        if (error.message.includes("550")) {
          reject({ status: 550, msg: "The email is not correct" });
        } else {
          reject({ status: 500, error: "Error sending email" });
        }
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  sendingEmail,
};
