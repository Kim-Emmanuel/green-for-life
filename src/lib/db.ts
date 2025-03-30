import { PrismaClient } from '@prisma/client'
import { withRetry } from './db-retry'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Initialize Prisma Client with custom logging
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Wrapper for database operations with retry logic
export async function withDB<T>(operation: () => Promise<T>): Promise<T> {
  return withRetry(operation, {
    maxAttempts: 3,
    initialDelay: 100,
    maxDelay: 3000,
  })
}