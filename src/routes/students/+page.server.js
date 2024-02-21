import { dev } from '$app/environment'
import { db } from '$lib/data'
import { students as studentModel, studentsToGroups } from '$lib/data/schema'
import { studentCreateSchema } from '$lib/schema'
import { parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'

export async function load() {
  const students = await db
    .select()
    .from(studentModel)
    .orderBy(studentModel.name)
  return {
    students,
  }
}

export const actions = {
  create: async ({ request }) => {
    const formData = await parseForm(studentCreateSchema, request)
    if (formData.errors) return fail(400, formData)
    try {
      const newStudent = await db
        .insert(studentModel)
        .values({
          name: formData.name,
        })
        .returning()
      if (newStudent.length === 0)
        return fail(500, {
          errors: { all: 'New student was not added to database.' },
        })
      const newStudentToGroup = await db.insert(studentsToGroups).values({
        studentId: newStudent[0].id,
        groupId: formData.groupId,
      })
      if (newStudentToGroup.changes === 0)
        return fail(500, {
          errors: { all: 'New student was not added to group.' },
        })
      return { success: true }
    } catch (error) {
      dev && console.error(error)
      console.info('caught')
      return fail(500, {
        errors: { all: 'A server error occurred when adding student.' },
      })
    }
  },
}
