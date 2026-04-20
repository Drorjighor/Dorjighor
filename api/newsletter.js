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
    const { email, preferences } = req.body || {};

    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPreferences = Array.isArray(preferences)
      ? preferences.map((item) => String(item).trim()).filter(Boolean)
      : [];

    if (!normalizedEmail) {
      return json(res, 400, { message: 'Email is required.' });
    }

    const { from, to } = getMailAddresses();

    await sendMail({
      from,
      to,
      subject: '[Dorjighor Newsletter] New subscriber',
      replyTo: normalizedEmail,
      text: `Newsletter subscription\n\nEmail: ${normalizedEmail}\nPreferences: ${normalizedPreferences.join(', ') || 'N/A'}`,
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${normalizedEmail}</p>
        <p><strong>Preferences:</strong> ${normalizedPreferences.join(', ') || 'N/A'}</p>
      `,
    });

    await sendMail({
      from,
      to: normalizedEmail,
      subject: 'Welcome to Dorjighor Newsletter',
      text: 'Thanks for subscribing to Dorjighor. You will receive new arrivals, exclusive offers, and style updates.',
      html: '<p>Thanks for subscribing to <strong>Dorjighor</strong>. You will receive new arrivals, exclusive offers, and style updates.</p>',
    });

    return json(res, 200, { message: 'Subscription submitted successfully.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return json(res, 500, { message: 'Failed to submit subscription.', error: message });
  }
}
