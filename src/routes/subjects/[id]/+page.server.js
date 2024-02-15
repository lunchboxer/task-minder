import { db, subjects } from '$lib/data'
import { subjectUpdateSchema } from '$lib/schema'
import { parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export async function load({ params }) {
  const subject = await db
    .select()
    .from(subjects)
    .where(eq(subjects.id, params.id))
  return {
    subject: subject[0],
  }
}

export const actions = {
  default: async ({ request }) => {
    const formData = await parseForm(subjectUpdateSchema, request)
    if (formData.errors) return fail(400, formData)
    const result = await db
      .update(subjects)
      .set(formData)
      .where(eq(subjects.id, formData.id))
    if (result.changes === 0)
      return fail(500, { errors: { all: 'Could not update subject' } })
    return { success: true }
  },
}
