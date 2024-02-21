import { db } from '$lib/data'
import {
  assignments as assignmentModel,
  groups as groupsModel,
} from '$lib/data/schema'
import { assignmentCreateSchema } from '$lib/schema'
import { addAction } from '$lib/server-utils'
import { eq } from 'drizzle-orm'

export const load = async ({ locals }) => {
  const { activeSchoolYear } = locals.user
  const assignments = await db
    .select(assignmentModel)
    .from(assignmentModel)
    .innerJoin(groupsModel, eq(assignmentModel.groupId, groupsModel.id))
    .where(eq(groupsModel.schoolYearId, activeSchoolYear))
    .orderBy(assignmentModel.dueDate)

  return { assignments }
}

export const actions = {
  create: async ({ request }) =>
    addAction(request, assignmentModel, assignmentCreateSchema),
}
