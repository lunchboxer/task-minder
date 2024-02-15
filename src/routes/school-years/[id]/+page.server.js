import { db, schoolYears } from '$lib/data'
import { schoolYearUpdateSchema } from '$lib/schema'
import { parseForm } from '$lib/server-utils'
import { error } from '@sveltejs/kit'
import { fail } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

// load schoolYear from db using id from params or return 404

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
  const schoolYear = await db
    .select()
    .from(schoolYears)
    .where(eq(schoolYears.id, params.id))
  if (!schoolYear[0]) {
    throw error(404, "School year doesn't exist")
  }
  return { schoolYear: schoolYear[0] }
}

export const actions = {
  update: async ({ request }) => {
    const formData = await parseForm(schoolYearUpdateSchema, request)
    if (formData.errors) return fail(400, formData)
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      return fail(400, {
        ...formData,
        errors: {
          startDate: 'Start date must be before end date.',
          endDate: 'End date must be after start date.',
        },
      })
    }

    const schoolYear = await db
      .update(schoolYears)
      .set(formData)
      .where(eq(schoolYears.id, formData.id))
      .returning()

    return { success: true, schoolYear: schoolYear[0] }
  },
}
