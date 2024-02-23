import { dev } from '$app/environment'
import { client } from '$lib/data'
import { fail } from '@sveltejs/kit'
import { nanoid } from 'nanoid'

function generateInsertSQL(data, tableName) {
  data.id = nanoid(12)
  const columns = Object.keys(data).join(', ')
  const values = Object.values(data)
  const placeholders = values.map(() => '?').join(', ')

  return {
    sql: `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`,
    args: values,
  }
}

function generateUpdateSQL(data, tableName) {
  const columns = Object.keys(data)
    .map(key => `${key} = ?`)
    .join(', ')
  const values = Object.values(data)
  return {
    sql: `UPDATE ${tableName} SET ${columns} WHERE id = ?`,
    args: [...values, data.id],
  }
}

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

export const deleteAction = async (request, tableName) => {
  const data = await request.formData()
  const id = data.get('id')
  const result = await client.execute({
    sql: `DELETE FROM ${tableName} WHERE id = ?`,
    args: [id],
  })
  if (result.rowsAffected === 0)
    return fail(500, { errors: { all: 'Could not delete record' } })
  return { success: true }
}

export const updateAction = async (
  request,
  tableName,
  validationSchema,
  otherValidations,
  customQueryObject,
) => {
  const formData = await parseForm(validationSchema, request)
  if (formData.errors) return fail(400, formData)
  try {
    if (otherValidations) {
      const validations = Array.isArray(otherValidations)
        ? otherValidations
        : [otherValidations]
      for (const validation of validations) {
        const errors = await validation(formData)
        if (errors) return fail(400, errors)
      }
    }
    const sql = customQueryObject || generateUpdateSQL(formData, tableName)
    const result = await client.execute(sql)
    if (result.rowsAffected === 0)
      return fail(500, {
        errors: { all: 'Record was not updated.' },
      })
    return { success: true }
  } catch (error) {
    dev && console.error(error)
    return fail(500, {
      errors: { all: 'Record was not updated.' },
    })
  }
}

export const addAction = async (
  request,
  tableName,
  validationSchema,
  otherValidations,
  customQueryObject,
) => {
  const formData = await parseForm(validationSchema, request)

  if (formData.errors) return fail(400, formData)
  try {
    if (otherValidations) {
      const validations = Array.isArray(otherValidations)
        ? otherValidations
        : [otherValidations]
      for (const validation of validations) {
        const errors = await validation(formData)
        if (errors) return fail(400, errors)
      }
    }
    const sql = customQueryObject || generateInsertSQL(formData, tableName)
    const result = await client.execute(sql)
    if (result.rowsAffected === 0)
      return fail(500, {
        errors: { all: 'New record was not added.' },
      })
    return { success: true }
  } catch (error) {
    dev && console.error(error)
    return fail(500, {
      errors: { all: 'New record was not added.' },
    })
  }
}
