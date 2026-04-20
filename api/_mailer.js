import nodemailer from 'nodemailer';

function toInt(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getMailerConfig() {
  return {
    host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
    port: toInt(process.env.BREVO_SMTP_PORT, 587),
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
  };
}

export function getMailAddresses() {
  return {
    from: process.env.MAIL_FROM || process.env.BREVO_SMTP_USER || 'no-reply@dorjighor.com.bd',
    to: process.env.MAIL_TO || 'support@dorjighor.com.bd',
  };
}

export async function sendMail(options) {
  const transporter = nodemailer.createTransport(getMailerConfig());
  await transporter.sendMail(options);
}
