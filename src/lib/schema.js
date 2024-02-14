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

export const schoolYearCreateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(60),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
})
