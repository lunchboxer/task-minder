import { students } from '$lib/data'
import { studentCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'

export const actions = {
  create: async ({ request }) => {
    return addAction(request, students, studentCreateSchema)
  },
}
