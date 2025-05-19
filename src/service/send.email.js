import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ao198523@gmail.com",
        pass: "tqkx ljfp ocjr vxmm",
      },
    });

    const mailOptions = {
      from: '"2os2os" <ao198523@gmail.com>',
      to: to || "ao198523@gmail.com",
      subject: subject,
      html: html ? `<h1>${html}</h1>` : "<h1>Hello</h1>",
    };

    const info = await transporter.sendMail(mailOptions);
    if (info) {
      console.log('Email sent:', info.messageId);
      return info.accepted && info.accepted.length > 0;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
