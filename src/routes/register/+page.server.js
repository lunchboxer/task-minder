import { fail } from '@sveltejs/kit'
import { z } from 'zod'
import { superValidate, setError } from 'sveltekit-superforms/server'
import { scryptSync, randomBytes } from 'node:crypto'
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
const hashPassword = password => {
  const salt = randomBytes(16).toString('hex')
  return encryptPassword(password, salt) + salt
}

const schema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  name: z.string(),
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

    const { username, name, password } = form.data
    const usernameTaken = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username.toLowerCase()))
      .limit(1)

    if (usernameTaken && usernameTaken.length > 0) {
      return setError(form, 'username', 'Username already taken.')
    }

    const newUser = await db
      .insert(users)
      .values({
        username: username.toLowerCase(),
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

    // const { password: _, ...cleanUser } = user[0]
    // return json({ user: cleanUser })

    redirect(307, '/')
  },
}
