import { db, students as studentModel } from '$lib/data'
import { studentCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'

export async function load() {
  const students = await db.select().from(studentModel)
  return {
    students,
  }
}

export const actions = {
  create: async ({ request }) => {
    return addAction(request, studentModel, studentCreateSchema)
  },
}
