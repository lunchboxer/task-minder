import { db, students } from '$lib/data'
import { deleteAction } from '$lib/server-utils'
import { eq } from 'drizzle-orm'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
  const student = await db
    .select()
    .from(students)
    .where(eq(students.id, params.id))
  return {
    student: student[0],
  }
}

export const actions = {
  default: async ({ request }) => deleteAction(request, students),
}
