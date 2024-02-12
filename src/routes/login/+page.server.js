import { fail } from '@sveltejs/kit'
import { z } from 'zod'
import { superValidate, setError } from 'sveltekit-superforms/server'
import { scryptSync } from 'node:crypto'
import { dev } from '$app/environment'
import { JWT_SECRET } from '$env/static/private'
import { db, users } from '$lib/data/index'
import { eq } from 'drizzle-orm'
import { redirect } from '@sveltejs/kit'
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

const schema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(4),
})
export const load = async () => {
  const form = await superValidate(schema)
  return { form }
}

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, schema)

    if (!form.valid) {
      return fail(400, { form })
    }
    const { username, password } = form.data
    const user = await db
      .select({ id: users.id, password: users.password })
      .from(users)
      .where(eq(users.username, username.toLowerCase()))
      .limit(1)

    if (user && user.length === 0) {
      return setError(form, 'username', 'Username not found.')
    }
    if (!passwordMatches(password, user[0].password)) {
      return setError(form, 'password', 'Invalid password')
    }

    const token = sign({ userId: user[0].id })

    cookies.set('auth', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 7,
    })

    // const { password: _, ...cleanUser } = user[0]
    // return json({ user: cleanUser })

    redirect(307, '/')
  },
}
