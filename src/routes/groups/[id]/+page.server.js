import { db, groups } from '$lib/data'
import { groupUpdateSchema } from '$lib/schema'
import { deleteAction } from '$lib/server-utils'
import { parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export function load({ params }) {
  return {
    groupId: params.id,
  }
}

export const actions = {
  delete: async ({ request }) => deleteAction(request, groups),
  update: async ({ request }) => {
    const formData = await parseForm(groupUpdateSchema, request)
    if (formData.errors) return fail(400, formData)
    const result = await db
      .update(groups)
      .set(formData)
      .where(eq(groups.id, formData.id))
    if (result.changes === 0)
      return fail(500, { errors: { all: 'Could not update group' } })
    return { success: true }
  },
}
