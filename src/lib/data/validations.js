// validations.js  extra validation functions
// take formData object
// return the error object { errors: { field: 'error message' } }
import { client, sql } from '$lib/data'

export const subjectNameUnique = async ({ name }) => {
  const sameNameSubjects = await client.execute(
    sql`SELECT * FROM subject WHERE name = ${name};`,
  )
  if (sameNameSubjects?.rows?.length > 0) {
    return { errors: { name: 'Name must be unique' } }
  }
}

export const mustStartBeforeEnd = ({ start_date, end_date }) => {
  if (new Date(start_date) > new Date(end_date)) {
    return {
      errors: {
        start_date: 'Start date must be before end date.',
        end_date: 'End date must be after start date.',
      },
    }
  }
}
