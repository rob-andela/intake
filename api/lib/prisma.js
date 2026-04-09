'use strict';

/**
 * Prisma client singleton.
 *
 * Vercel serverless functions are stateless between invocations, but within a
 * single warm instance the module cache persists.  Storing the client on a
 * module-level variable (rather than in `global`) is therefore sufficient to
 * avoid exhausting the Neon connection pool during a single warm invocation
 * burst, while still being safe in cold-start scenarios.
 */

const { PrismaClient } = require('@prisma/client');

let prisma;

/**
 * Returns the shared PrismaClient instance, creating it on first call.
 * @returns {PrismaClient}
 */
function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

module.exports = { getPrisma };
