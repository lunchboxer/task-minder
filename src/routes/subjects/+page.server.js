import { db, subjects as subjectsModel } from '$lib/data'
import { subjectNameUnique } from '$lib/data/validations'
import { subjectCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
  const subjects = await db.select().from(subjectsModel)
  return { subjects }
}

export const actions = {
  create: async ({ request }) => {
    return addAction(request, subjectsModel, subjectCreateSchema, [
      subjectNameUnique,
    ])
  },
}
