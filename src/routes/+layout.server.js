import {
  db,
  groups as groupModel,
  schoolYears as schoolYearModel,
} from '$lib/data'
import { desc, eq } from 'drizzle-orm'

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
  const me = event.locals.user
  if (!me) return
  const schoolYears = await db
    .select()
    .from(schoolYearModel)
    .orderBy(desc(schoolYearModel.endDate))
  const groups = await db
    .select()
    .from(groupModel)
    .where(eq(groupModel.schoolYearId, me.activeSchoolYear))
    .orderBy(groupModel.grade)
  return {
    me,
    schoolYears,
    groups,
  }
}
