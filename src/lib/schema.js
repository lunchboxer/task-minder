import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: 'Username is required' })
    .max(18),
  password: z
    .string()
    .trim()
    .min(4, { message: 'Password is 4-20 characters' })
    .max(20, { message: 'Password is 4-20 characters' }),
})

export const registerSchema = loginSchema.extend({
  name: z.string().trim().max(60),
})

export const schoolYearCreateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(60),
  startDate: z.string().length(10, { message: 'Start date is required' }),
  endDate: z.string().length(10, { message: 'End date is required' }),
})

export const schoolYearUpdateSchema = schoolYearCreateSchema.extend({
  id: z.string(),
})

export const groupCreateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(60),
  grade: z.string().min(1, { message: 'Grade is required' }),
})

export const groupUpdateSchema = groupCreateSchema.extend({
  id: z.string(),
  schoolYearId: z.string().length(12).optional(),
})

export const studentCreateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(60),
  groupId: z.string().length(12),
})

export const studentUpdateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(60),
  id: z.string().length(12),
})

export const subjectCreateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(60),
})

export const subjectUpdateSchema = subjectCreateSchema.extend({
  id: z.string(),
})

export const addStudentToGroupSchema = z.object({
  studentId: z.string().length(12),
  groupId: z.string().length(12),
})

export const toggleArchiveStudentSchema = z.object({
  studentId: z.string().length(12),
})
export const assignmentCreateSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).max(60),
  description: z.string(),
  groupId: z.string().length(12, { message: 'Group is required' }),
  type: z.enum(['classwork', 'homework']),
  assignedDate: z.string().nullable(),
  dueDate: z.string().nullable(),
  subjectId: z.string().length(12, { message: 'Subject is required' }),
})
export const assignmentUpdateSchema = assignmentCreateSchema.extend({
  id: z.string().length(12),
})
