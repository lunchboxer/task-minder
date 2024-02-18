import { subjects } from '$lib/data'
import { subjectCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'
import { subjectNameUnique } from '$lib/data/validations'

export const actions = {
  create: async ({ request }) => {
    return addAction(request, subjects, subjectCreateSchema, [
      subjectNameUnique,
    ])
  },
}
