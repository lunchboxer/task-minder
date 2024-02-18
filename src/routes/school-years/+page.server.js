import { db, schoolYears as schoolYearModel } from '$lib/data'
import { schoolYearCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'

export const load = async () => {
  return {
    schoolYears: await db.select().from(schoolYearModel),
  }
}
export const actions = {
  create: async ({ request }) => {
    return addAction(request, schoolYearModel, schoolYearCreateSchema)
  },
}
