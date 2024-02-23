import { randomBytes, scryptSync } from 'node:crypto'
import { dev } from '$app/environment'
import { JWT_SECRET } from '$env/static/private'
import { client, sql } from '$lib/data/index'
import { registerSchema } from '$lib/schema'
import { parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'
import { createSigner } from 'fast-jwt'
import { nanoid } from 'nanoid'

const sign = createSigner({ key: JWT_SECRET })

const encryptPassword = (password, salt) => {
  return scryptSync(password, salt, 32).toString('hex')
}
const hashPassword = password => {
  const salt = randomBytes(16).toString('hex')
  return encryptPassword(password, salt) + salt
}

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await parseForm(registerSchema, request)
    if (formData.errors) return fail(400, formData)
    const { username, name, password } = formData
    const result = await client.execute(
      sql`SELECT id FROM user WHERE username = ${username} LIMIT 1`,
    )

    if (result?.rows?.length > 0) {
      return fail(400, {
        ...formData,
        errors: { username: 'Username already taken.' },
      })
    }

    try {
      const id = nanoid(12)
      const newUserResult = await client.execute(
        sql`INSERT INTO user (id, username, name, password) 
        VALUES (${id}, ${username}, ${name}, ${hashPassword(password)})`,
      )
      if (newUserResult.rowsAffected !== 1)
        return fail(500, { error: { all: 'Could not register new user' } })

      const token = sign({ userId: id })

      cookies.set('auth', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: !dev,
        maxAge: 60 * 60 * 24 * 7,
      })
      return { success: true }
    } catch (error) {
      dev && console.error(error)
      return fail(500, { error: { all: 'Could not register new user' } })
    }
  },
}
