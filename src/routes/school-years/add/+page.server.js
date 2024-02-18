import { schoolYears } from '$lib/data'
import { schoolYearCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'

export const actions = {
  create: async ({ request }) => {
    return addAction(request, schoolYears, schoolYearCreateSchema)
  },
}
