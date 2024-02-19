import { db } from '$lib/data'
import { students, studentsToGroups, groups } from '$lib/data/schema'
import { studentUpdateSchema } from '$lib/schema'
import { parseForm, deleteAction } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export async function load({ params }) {
  const student = await db
    .select()
    .from(students)
    .where(eq(students.id, params.id))
  const studentGroups = await db
    .select({
      id: groups.id,
      name: groups.name,
      schoolYearId: groups.schoolYearId,
    })
    .from(studentsToGroups)
    .where(eq(studentsToGroups.studentId, params.id))
    .innerJoin(groups, eq(studentsToGroups.groupId, groups.id))
  return {
    student: student[0],
    studentGroups,
  }
}

export const actions = {
  delete: async ({ request }) => deleteAction(request, students),
  update: async ({ request }) => {
    const formData = await parseForm(studentUpdateSchema, request)
    if (formData.errors) return fail(400, formData)
    const result = await db
      .update(students)
      .set(formData)
      .where(eq(students.id, formData.id))
    if (result.changes === 0)
      return fail(500, { errors: { all: 'Could not update student' } })
    return { success: true }
  },
}
