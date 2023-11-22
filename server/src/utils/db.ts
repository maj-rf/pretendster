import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      datasources: {
        db: {
          url:
            process.env.NODE_ENV === 'test'
              ? process.env.DATABASE_TEST_URL
              : process.env.DATABASE_URL,
        },
      },
    });
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
