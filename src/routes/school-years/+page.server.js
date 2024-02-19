import { db, schoolYears as schoolYearModel } from '$lib/data'
import { schoolYearCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'
import { desc } from 'drizzle-orm'

export const load = async () => {
  return {
    schoolYears: await db
      .select()
      .from(schoolYearModel)
      .orderBy(desc(schoolYearModel.endDate)),
  }
}
export const actions = {
  create: async ({ request }) => {
    return addAction(request, schoolYearModel, schoolYearCreateSchema)
  },
}
