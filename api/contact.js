import { getMailAddresses, sendMail } from './_mailer.js';

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, details } = req.body || {};

    if (!name || !email || !subject || !details) {
      return json(res, 400, { message: 'Missing required fields.' });
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedSubject = String(subject).trim();
    const trimmedDetails = String(details).trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedDetails) {
      return json(res, 400, { message: 'Invalid input.' });
    }

    const { from, to } = getMailAddresses();

    await sendMail({
      from,
      to,
      subject: `[Dorjighor Contact] ${trimmedSubject}`,
      replyTo: trimmedEmail,
      text: `New contact ticket\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nSubject: ${trimmedSubject}\n\nDetails:\n${trimmedDetails}`,
      html: `
        <h2>New Contact Ticket</h2>
        <p><strong>Name:</strong> ${trimmedName}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Subject:</strong> ${trimmedSubject}</p>
        <p><strong>Details:</strong></p>
        <p>${trimmedDetails.replace(/\n/g, '<br/>')}</p>
      `,
    });

    await sendMail({
      from,
      to: trimmedEmail,
      subject: 'Dorjighor Support Ticket Received',
      text: `Hello ${trimmedName},\n\nWe received your support request (${trimmedSubject}). Our team will get back to you soon.\n\nThanks,\nDorjighor Support`,
      html: `
        <p>Hello ${trimmedName},</p>
        <p>We received your support request (<strong>${trimmedSubject}</strong>). Our team will get back to you soon.</p>
        <p>Thanks,<br/>Dorjighor Support</p>
      `,
    });

    return json(res, 200, { message: 'Ticket submitted successfully.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return json(res, 500, { message: 'Failed to submit ticket.', error: message });
  }
}
