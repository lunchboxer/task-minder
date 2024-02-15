import { db, students } from '$lib/data'
import { studentUpdateSchema } from '$lib/schema'
import { parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export async function load({ params }) {
  const student = await db
    .select()
    .from(students)
    .where(eq(students.id, params.id))
  return {
    student: student[0],
  }
}

export const actions = {
  default: async ({ request }) => {
    const formData = await parseForm(studentUpdateSchema, request)
    if (formData.errors) return fail(400, formData)
    const result = await db
      .update(students)
      .set(formData)
      .where(eq(students.id, formData.id))
    if (result.changes === 0)
      return fail(500, { errors: { all: 'Could not update student' } })
    return { success: true }
  },
}
