import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from './env.configuration.js'
import { PrismaClient } from '../../prisma/generated/prisma/index.js'

const prismaClient = env.nodeEnv === 'production'
  ? new PrismaClient().$extends(withAccelerate())
  : new PrismaClient()

export const prisma = prismaClient