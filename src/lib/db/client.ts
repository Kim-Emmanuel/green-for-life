// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient().$extends({
//   result: {
//     user: {
//       password_hash: {
//         needs: {},
//         compute() {
//           return undefined; // Always remove password_hash from query results
//         },
//       },
//     },
//   },
// });

// export { prisma };

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;