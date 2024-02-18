// validations.js  extra validation functions
// take formData object
// return the error object { errors: { field: 'error message' } }
import { db, subjects } from '$lib/data'
import { eq } from 'drizzle-orm'

export const subjectNameUnique = async ({ name }) => {
  const sameNameSubjects = await db
    .select()
    .from(subjects)
    .where(eq(subjects.name, name))
  if (sameNameSubjects.length > 0) {
    return { errors: { name: 'Name must be unique' } }
  }
}
