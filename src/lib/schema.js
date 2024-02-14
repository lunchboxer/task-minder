import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }).max(18),
  password: z.string().min(4).max(20),
})

export const registerSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }).max(18),
  name: z.string().max(60),
  password: z.string().min(4).max(20),
})
