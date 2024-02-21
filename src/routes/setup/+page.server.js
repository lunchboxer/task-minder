import { db } from '$lib/data'
import { users } from '$lib/data/schema'
import { schoolYears } from '$lib/data/schema'
import { schoolYearCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const actions = {
  create: async ({ request }) => {
    return addAction(request, schoolYears, schoolYearCreateSchema)
  },
  setActiveSchoolYear: async ({ request, locals }) => {
    const formData = await request.formData()
    const result = await db
      .update(users)
      .set({ activeSchoolYear: formData.get('activeSchoolYear') })
      .where(eq(users.id, locals.user.id))
    if (result.changes === 0)
      return fail(500, { errors: { all: 'Could not set active school year' } })
    return { success: true }
  },
}
