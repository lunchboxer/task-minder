import { scryptSync } from 'node:crypto'
import { dev } from '$app/environment'
import { JWT_SECRET } from '$env/static/private'
import { client, sql } from '$lib/data'
import { loginSchema } from '$lib/schema'
import { parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'
import { createSigner } from 'fast-jwt'

const sign = createSigner({ key: JWT_SECRET })

const encryptPassword = (password, salt) => {
  return scryptSync(password, salt, 32).toString('hex')
}

const passwordMatches = (password, hash) => {
  const salt = hash.slice(64)
  const originalPassHash = hash.slice(0, 64)
  const currentPassHash = encryptPassword(password, salt)
  return originalPassHash === currentPassHash
}

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await parseForm(loginSchema, request)
    if (formData.errors) return fail(400, formData)
    const { username, password } = formData
    const result = await client.execute(
      sql`SELECT id, password FROM user WHERE username = ${username} LIMIT 1`,
    )
    const user = result.rows[0]

    if (!user) {
      return fail(400, {
        ...formData,
        errors: { username: 'Username not found.' },
      })
    }
    if (!passwordMatches(password, user.password)) {
      return fail(400, {
        ...formData,
        errors: { password: 'Invalid password.' },
      })
    }

    const token = sign({ userId: user.id })

    cookies.set('auth', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 7,
    })

    const { password: _, ...cleanUser } = user
    return { success: true, user: cleanUser }
  },
}
