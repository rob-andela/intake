'use strict';

/**
 * POST /api/submit
 *
 * Accepts a completed assessment payload and persists it as a Submission
 * record in Neon Postgres via Prisma.
 *
 * Required body fields:
 *   - persona     {string}  Display name of the persona or "Custom Assessment"
 *   - score       {number}  Final numeric score (0-100)
 *   - scoreBand   {string}  Band label (e.g. "Deployable")
 *   - responses   {object}  Map of question ID → selected option value
 *   - dimensions  {object}  Map of dimension key → average score
 *
 * Returns: { id: string }
 */

const { getPrisma } = require('./lib/prisma');

/**
 * Collects the raw request body by listening to the readable stream.
 * Vercel serverless functions do not automatically parse JSON bodies.
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

  // Only accept POST
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Parse body
  let body;
  try {
    const raw = await readBody(req);
    body = JSON.parse(raw);
  } catch {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Invalid JSON body' }));
    return;
  }

  // Validate required fields
  const { persona, score, scoreBand, responses, dimensions } = body;
  if (
    persona === undefined ||
    score === undefined ||
    scoreBand === undefined ||
    responses === undefined ||
    dimensions === undefined
  ) {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        error: 'Missing required fields: persona, score, scoreBand, responses, dimensions'
      })
    );
    return;
  }

  // Persist to database
  try {
    const db = getPrisma();
    const submission = await db.submission.create({
      data: {
        persona: String(persona),
        score: Number(score),
        scoreBand: String(scoreBand),
        responses,
        dimensions
      }
    });

    res.statusCode = 201;
    res.end(JSON.stringify({ id: submission.id }));
  } catch (err) {
    console.error('[api/submit] DB error:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Failed to save submission' }));
  }
};
