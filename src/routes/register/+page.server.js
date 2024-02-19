import { randomBytes, scryptSync } from 'node:crypto'
import { dev } from '$app/environment'
import { JWT_SECRET } from '$env/static/private'
import { db, users } from '$lib/data/index'
import { registerSchema } from '$lib/schema'
import { parseForm } from '$lib/server-utils'
import { fail } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { createSigner } from 'fast-jwt'

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
    const usernameTaken = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    if (usernameTaken && usernameTaken.length > 0) {
      return fail(400, {
        ...formData,
        errors: { username: 'Username already taken.' },
      })
    }

    const newUser = await db
      .insert(users)
      .values({
        username,
        name,
        password: hashPassword(password),
      })
      .returning()

    const token = sign({ userId: newUser[0].id })

    cookies.set('auth', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 7,
    })

    const { password: _, ...cleanUser } = newUser[0]
    return { success: true, user: cleanUser }
  },
}
