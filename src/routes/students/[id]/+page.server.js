import { dev } from '$app/environment'
import { db } from '$lib/data'
import { groups, students, studentsToGroups } from '$lib/data/schema'
import { addStudentToGroupSchema, studentUpdateSchema } from '$lib/schema'
import { parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'
import { eq, and } from 'drizzle-orm'

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
  delete: async ({ request }) => {
    const data = await request.formData()
    const id = data.get('id')
    await db.delete(studentsToGroups).where(eq(studentsToGroups.studentId, id))
    const result = await db.delete(students).where(eq(students.id, id))
    if (result.changes === 0)
      return fail(500, { errors: { all: 'Could not delete record' } })
    return { success: true }
  },
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
  addGroup: async ({ request }) => {
    const formData = await parseForm(addStudentToGroupSchema, request)
    if (formData.errors) return fail(400, formData)
    try {
      const result = await db.insert(studentsToGroups).values(formData)
      if (result.changes === 0)
        return fail(500, { errors: { all: 'Could not add group to student' } })
      return { success: true }
    } catch (error) {
      dev && console.error(error)
      return fail(500, { errors: { all: 'Could not add group to student' } })
    }
  },
  removeFromGroup: async ({ request }) => {
    const formData = await parseForm(addStudentToGroupSchema, request)
    if (formData.errors) return fail(400, formData)
    try {
      const result = await db
        .delete(studentsToGroups)
        .where(
          and(
            eq(studentsToGroups.studentId, formData.studentId),
            eq(studentsToGroups.groupId, formData.groupId),
          ),
        )
      if (result.changes === 0)
        return fail(500, {
          errors: { all: 'Could not remove group from student' },
        })
      return { success: true }
    } catch (error) {
      dev && console.error(error)
      return fail(500, {
        errors: { all: 'Could not remove group from student' },
      })
    }
  },
}
