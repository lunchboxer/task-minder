import { schoolYears } from '$lib/data'
import { deleteAction } from '$lib/server-utils'

/** @type {import('./$types').PageServerLoad} */
export const load = ({ params }) => {
  return { schoolYearId: params.id }
}

export const actions = {
  default: ({ request }) => deleteAction(request, schoolYears),
}
