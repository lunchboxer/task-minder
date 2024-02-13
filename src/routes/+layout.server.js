import {
  db,
  schoolYears as schoolYearModel,
  groups as groupModel,
} from '$lib/data'

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
  const me = event.locals.user
  if (!me) return
  const schoolYears = await db.select().from(schoolYearModel)
  const groups = await db.select().from(groupModel)
  return {
    me,
    schoolYears,
    groups,
  }
}
