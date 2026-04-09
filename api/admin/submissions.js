'use strict';

/**
 * GET /api/admin/submissions
 *
 * Returns all Submission records ordered by createdAt descending.
 *
 * Auth: Bearer token in Authorization header must match the
 * ADMIN_SECRET environment variable.  If ADMIN_SECRET is not set the
 * endpoint always returns 401.
 */

const { getPrisma } = require('../lib/prisma');

/**
 * Validates the Authorization header against ADMIN_SECRET.
 *
 * @param {import('http').IncomingMessage} req
 * @returns {boolean}
 */
function isAuthorized(req) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false; // No secret configured → always deny

  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  return token === secret;
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Auth check
  if (!isAuthorized(req)) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Unauthorized' }));
    return;
  }

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const db = getPrisma();
    const submissions = await db.submission.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.statusCode = 200;
    res.end(JSON.stringify(submissions));
  } catch (err) {
    console.error('[api/admin/submissions] DB error:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Failed to retrieve submissions' }));
  }
};
