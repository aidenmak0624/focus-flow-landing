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
    const { firstName, lastName, email, role, challenge } = req.body || {};

    // Validate
    if (!email || !firstName) {
      return res.status(400).json({ error: 'firstName and email are required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const sql = getSQL();
    const cleanEmail = email.toLowerCase().trim();

    // Check duplicate
    const existing = await sql`
      SELECT id FROM waitlist WHERE email = ${cleanEmail} LIMIT 1
    `;
    if (existing.length > 0) {
      return res.status(409).json({ error: 'This email is already on the waitlist' });
    }

    // Insert
    await sql`
      INSERT INTO waitlist (first_name, last_name, email, role, challenge, source)
      VALUES (${firstName.trim()}, ${lastName?.trim() || null}, ${cleanEmail},
              ${role || null}, ${challenge?.trim() || null}, 'landing_page')
    `;

    // Get total count
    const countResult = await sql`SELECT COUNT(*)::int AS total FROM waitlist`;
    const total = countResult[0]?.total || 0;

    // Email notification (non-blocking)
    sendNotification(
      `New FocusFlow Signup (#${total})`,
      `<h2>New Waitlist Signup</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Name</td><td>${firstName} ${lastName || ''}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td>${cleanEmail}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Role</td><td>${role || '—'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Challenge</td><td>${challenge || '—'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Total signups</td><td>${total}</td></tr>
      </table>`
    );

    return res.status(201).json({
      success: true,
      message: "You're on the waitlist!",
      position: total,
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
