'use strict';

/**
 * /api/admin/submission?id=<submissionId>
 *
 * GET    — Fetch a single submission by id.
 * PATCH  — Update status and/or notes on a submission.
 * DELETE — Delete a submission by id.
 *
 * All methods require Authorization: Bearer <ADMIN_SECRET>.
 * Returns 404 when the submission is not found.
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

/**
 * Collects the raw request body from the readable stream.
 *
 * @param {import('http').IncomingMessage} req
 * @returns {Promise<string>}
 */
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Auth check
  if (!isAuthorized(req)) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Unauthorized' }));
    return;
  }

  // Extract the id query parameter
  const url = new URL(req.url, 'http://localhost');
  const id = url.searchParams.get('id');

  if (!id) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Missing required query parameter: id' }));
    return;
  }

  const db = getPrisma();

  // --- GET ---
  if (req.method === 'GET') {
    try {
      const submission = await db.submission.findUnique({ where: { id } });
      if (!submission) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Submission not found' }));
        return;
      }
      res.statusCode = 200;
      res.end(JSON.stringify(submission));
    } catch (err) {
      console.error('[api/admin/submission] GET error:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Failed to retrieve submission' }));
    }
    return;
  }

  // --- PATCH ---
  if (req.method === 'PATCH') {
    let body;
    try {
      const raw = await readBody(req);
      body = JSON.parse(raw);
    } catch {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      return;
    }

    // Build the update payload — only allow status and notes
    const data = {};
    if (body.status !== undefined) data.status = String(body.status);
    if (body.notes !== undefined) data.notes = body.notes === null ? null : String(body.notes);

    if (Object.keys(data).length === 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'No updatable fields provided (status, notes)' }));
      return;
    }

    try {
      const submission = await db.submission.update({ where: { id }, data });
      res.statusCode = 200;
      res.end(JSON.stringify(submission));
    } catch (err) {
      // Prisma throws P2025 when the record is not found
      if (err.code === 'P2025') {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Submission not found' }));
        return;
      }
      console.error('[api/admin/submission] PATCH error:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Failed to update submission' }));
    }
    return;
  }

  // --- DELETE ---
  if (req.method === 'DELETE') {
    try {
      await db.submission.delete({ where: { id } });
      res.statusCode = 200;
      res.end(JSON.stringify({ deleted: true }));
    } catch (err) {
      if (err.code === 'P2025') {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Submission not found' }));
        return;
      }
      console.error('[api/admin/submission] DELETE error:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Failed to delete submission' }));
    }
    return;
  }

  // Unsupported method
  res.statusCode = 405;
  res.end(JSON.stringify({ error: 'Method not allowed' }));
};
