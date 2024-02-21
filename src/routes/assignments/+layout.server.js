import { db } from '$lib/data'
import { subjects as subjectModel } from '$lib/data/schema'

export const load = async () => {
  const subjects = await db.select().from(subjectModel)
  return { subjects }
}
