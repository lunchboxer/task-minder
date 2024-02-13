import { dev } from '$app/environment'

// send it the zod schema and request
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
