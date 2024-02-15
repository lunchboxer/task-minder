import { groups } from '$lib/data'
import { deleteAction } from '$lib/server-utils'

/** @type {import('./$types').PageServerLoad} */
export const load = ({ params }) => {
  return { groupId: params.id }
}

export const actions = {
  default: async ({ request }) => deleteAction(request, groups),
}
