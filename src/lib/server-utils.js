import { dev } from '$app/environment'
import { db } from '$lib/data'
import { fail } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export async function parseForm(schema, request) {
  const formDataThing = await request.formData()
  const formDataObject = Object.fromEntries(formDataThing)
  const parsedData = schema.safeParse(formDataObject)

  if (!parsedData.success) {
    dev && console.error(parsedData.error)
    formDataObject.errors = {}
    for (const error of parsedData.error.errors) {
      formDataObject.errors[error.path[0]] = error.message
    }
  }
  return formDataObject
}

export const deleteAction = async (request, model) => {
  const data = await request.formData()
  const id = data.get('id')
  const result = await db.delete(model).where(eq(model.id, id))
  if (result.changes === 0)
    return fail(500, { errors: { all: 'Could not delete record' } })
  return { success: true }
}

export const addAction = async (
  request,
  model,
  validationSchema,
  otherValidations,
) => {
  const formData = await parseForm(validationSchema, request)
  if (formData.errors) return fail(400, formData)
  try {
    if (otherValidations && otherValidations.length > 0) {
      for (const validation of otherValidations) {
        const result = await validation(formData)
        if (result) return fail(400, result)
      }
    }
    const result = await db.insert(model).values(formData)
    if (result.changes === 0)
      return fail(500, {
        errors: { all: 'New record was not added to database.' },
      })
    return { success: true }
  } catch (error) {
    dev && console.error(error)
    return fail(500, {
      errors: { all: 'New record was not added to database.' },
    })
  }
}
