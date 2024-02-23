import { client, sql } from '$lib/data'
import { mustStartBeforeEnd } from '$lib/data/validations'
import { schoolYearCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'

export const load = async () => {
  const result = await client.execute(
    sql`SELECT * FROM school_year ORDER BY end_date DESC;`,
  )
  return {
    schoolYears: result?.rows || [],
  }
}
export const actions = {
  create: async ({ request }) => {
    return addAction(
      request,
      'school_year',
      schoolYearCreateSchema,
      mustStartBeforeEnd,
    )
  },
}
