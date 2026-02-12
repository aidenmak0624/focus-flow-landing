const { getSQL } = require('./_lib/db');
const { sendNotification } = require('./_lib/notify');

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, rating, features, message } = req.body || {};

    if (!rating && !features && !message) {
      return res.status(400).json({ error: 'Please provide at least a rating or some feedback' });
    }
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const sql = getSQL();

    await sql`
      INSERT INTO feedback (email, rating, features, message)
      VALUES (${email?.toLowerCase().trim() || null}, ${rating || null},
              ${features?.trim() || null}, ${message?.trim() || null})
    `;

    // Email notification (non-blocking)
    const stars = rating ? '\u2605'.repeat(rating) + '\u2606'.repeat(5 - rating) : 'No rating';
    sendNotification(
      `New FocusFlow Feedback ${stars}`,
      `<h2>New Feedback Received</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td>${email || 'Anonymous'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Rating</td><td>${stars}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Features</td><td>${features || '—'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Message</td><td>${message || '—'}</td></tr>
      </table>`
    );

    return res.status(201).json({
      success: true,
      message: 'Thanks for your feedback!',
    });
  } catch (err) {
    console.error('Feedback error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
