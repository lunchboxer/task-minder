import { dev } from '$app/environment'
import { JWT_SECRET } from '$env/static/private'
import { db, users } from '$lib/data'
import { redirect } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { createVerifier } from 'fast-jwt'

const getUserFromToken = async token => {
  if (!token) return
  try {
    const verify = createVerifier({ key: JWT_SECRET })
    const verifiedToken = verify(token)
    const userId = verifiedToken?.userId
    const user = await db.select().from(users).where(eq(users.id, userId))
    if (!user?.[0]) return
    const { password: _, ...authenticatedUser } = user[0]
    return authenticatedUser
  } catch (error) {
    dev && console.error('getUserFromToken error', error)
  }
}

const routesNotProtected = ['/about', '/login', '/register']
const unAuthenticatedOnlyRoutes = ['/login', '/register']

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const authToken = event.cookies.get('auth')
  event.locals.user = await getUserFromToken(authToken)
  if (
    unAuthenticatedOnlyRoutes.includes(event.url.pathname) &&
    event.locals.user
  ) {
    throw redirect(302, '/')
  }
  if (!(routesNotProtected.includes(event.url.pathname) || event.locals.user)) {
    throw redirect(302, '/login')
  }
  return resolve(event)
}
