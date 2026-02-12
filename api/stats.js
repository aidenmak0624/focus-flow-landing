const { getSQL } = require('./_lib/db');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const sql = getSQL();

    const result = await sql`SELECT * FROM landing_stats`;
    const stats = result[0] || {};

    return res.status(200).json({
      totalSignups: Number(stats.total_signups) || 0,
      totalFeedback: Number(stats.total_feedback) || 0,
      avgRating: stats.avg_rating ? Number(stats.avg_rating) : null,
    });
  } catch (err) {
    console.error('Stats error:', err);
    return res.status(500).json({ error: 'Failed to load stats' });
  }
};
