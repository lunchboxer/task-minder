import { db, subjects } from '$lib/data'
import { deleteAction } from '$lib/server-utils'
import { eq } from 'drizzle-orm'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
  const subject = await db
    .select()
    .from(subjects)
    .where(eq(subjects.id, params.id))
  return {
    subject: subject[0],
  }
}

export const actions = {
  default: async ({ request }) => deleteAction(request, subjects),
}
