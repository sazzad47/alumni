import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
});

export default async function sendEmail({ to, from, subject, html }) {
  const result = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html,
  });

  console.log(JSON.stringify(result, null, 4));
}
