const nodemailer = require('nodemailer');

/**
 * Send an email notification (best-effort — fails silently).
 */
async function sendNotification(subject, html) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env;

  // Skip if email config is not set
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) return;

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transport.sendMail({
      from: `"DecisionEase" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      subject,
      html,
    });
  } catch (err) {
    console.warn('Email notification failed (non-fatal):', err.message);
  }
}

module.exports = { sendNotification };
