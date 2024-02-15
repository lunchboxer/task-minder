import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }).max(18),
  password: z.string().min(4).max(20),
})

export const registerSchema = loginSchema.extend({
  name: z.string().max(60),
})

export const schoolYearCreateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(60),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
})

export const schoolYearUpdateSchema = schoolYearCreateSchema.extend({
  id: z.string(),
})

export const groupCreateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(60),
  grade: z.string().min(1, { message: 'Grade is required' }),
  schoolYearId: z.string().optional(),
})

export const groupUpdateSchema = groupCreateSchema.extend({
  id: z.string(),
})

export const studentCreateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(60),
})

export const studentUpdateSchema = studentCreateSchema.extend({
  id: z.string(),
})

export const subjectCreateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(60),
})

export const subjectUpdateSchema = subjectCreateSchema.extend({
  id: z.string(),
})
