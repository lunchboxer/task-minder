import { db, groups } from '$lib/data'
import { groupCreateSchema } from '$lib/schema'
import { parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ request }) => {
    const formData = await parseForm(groupCreateSchema, request)
    if (formData.errors) return fail(400, formData)
    const result = await db.insert(groups).values(formData)
    if (result.changes === 0)
      return fail(500, {
        errors: { all: 'New group was not added to database.' },
      })
    return { success: true }
  },
}
