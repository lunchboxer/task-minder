import { dev } from '$app/environment'
import { db } from '$lib/data'
import { assignments as assignmentModel } from '$lib/data/schema'
import { assignmentUpdateSchema } from '$lib/schema'
import { deleteAction, parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const load = async ({ params }) => {
  const assignment = await db
    .select()
    .from(assignmentModel)
    .where(eq(assignmentModel.id, params.id))
  return {
    assignment: assignment[0],
  }
}

export const actions = {
  delete: async ({ request }) => deleteAction(request, assignmentModel),
  update: async ({ request }) => {
    const formData = await parseForm(assignmentUpdateSchema, request)
    if (formData.errors) return fail(400, formData)
    try {
      const result = await db
        .update(assignmentModel)
        .set(formData)
        .where(eq(assignmentModel.id, formData.id))
      if (result.changes === 0) {
        return fail(400, { error: 'Could not update assignment' })
      }
      return { success: true }
    } catch (error) {
      dev && console.error(error)
      return fail(400, { error: 'Could not update assignment' })
    }
  },
}
