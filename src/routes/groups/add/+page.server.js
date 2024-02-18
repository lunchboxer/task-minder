import { groups } from '$lib/data'
import { groupCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'

export const actions = {
  create: async ({ request }) => {
    return addAction(request, groups, groupCreateSchema)
  },
}
