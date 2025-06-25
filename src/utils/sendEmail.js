import emailjs from '@emailjs/browser';

// Reemplaza estos valores por los de tu cuenta de EmailJS
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

export async function sendEmail({ to, subject, text }) {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: to,
        subject:subject,
        message: text,
      },
      USER_ID
    );
    return true;
  } catch (error) {
    console.error("Error enviando email:", error);
    return false;
  }
}