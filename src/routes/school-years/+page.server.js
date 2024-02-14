import { fail } from '@sveltejs/kit'
import { db, schoolYears } from '$lib/data'
import { schoolYearCreateSchema } from '$lib/schema'
import { parseForm } from '$lib/utils'

export const actions = {
  add: async ({ request }) => {
    const formData = await parseForm(schoolYearCreateSchema, request)
    if (formData.errors) return fail(400, formData)
    const { name, startDate, endDate } = formData
    const schoolYear = await db
      .insert(schoolYears)
      .values({ name, startDate, endDate })
      .returning()
    return { success: true, schoolYear }
  },
}
