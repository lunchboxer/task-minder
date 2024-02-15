import { db, students } from '$lib/data'
import { studentCreateSchema } from '$lib/schema'
import { parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ request }) => {
    const formData = await parseForm(studentCreateSchema, request)
    if (formData.errors) return fail(400, formData)
    const result = await db.insert(students).values(formData)
    if (result.changes === 0)
      return fail(500, {
        errors: { all: 'New student was not added to database.' },
      })
    return { success: true }
  },
}
