import { subjects } from '$lib/data'
import { subjectCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'

export const actions = {
  default: async ({ request }) =>
    addAction(request, subjects, subjectCreateSchema),
}
