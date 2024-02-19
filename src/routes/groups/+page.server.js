import { dev } from '$app/environment'
import { groups as groupModel, db } from '$lib/data'
import { groupCreateSchema } from '$lib/schema'
import { parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'

export const load = async () => {
  const groups = await db.select().from(groupModel).orderBy(groupModel.grade)
  return { groups }
}
export const actions = {
  create: async ({ request }) => {
    const formData = await parseForm(groupCreateSchema, request)
    if (formData.errors) return fail(400, formData)
    try {
      const result = await db.insert(groupModel).values({
        name: formData.name,
        grade: formData.grade,
        schoolYearId: formData.schoolYearId,
      })
      if (result.changes === 0)
        return fail(500, {
          errors: { all: 'New record was not added to database.' },
        })
      return { success: true }
    } catch (error) {
      dev && console.error(error)
      console.info('caught')
      return fail(500, {
        errors: { all: 'New record was not added to database.' },
      })
    }
  },
}
