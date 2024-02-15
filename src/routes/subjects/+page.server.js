import { db, subjects as subjectsModel } from '$lib/data'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
  const subjects = await db.select().from(subjectsModel)
  return { subjects }
}
