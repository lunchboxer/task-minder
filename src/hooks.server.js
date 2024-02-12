import { dev } from '$app/environment'
import { db, users } from '$lib/data'
import { eq } from 'drizzle-orm'
import { createVerifier } from 'fast-jwt'
import { JWT_SECRET } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

const getUserFromToken = async token => {
  if (!token) return
  try {
    const verify = createVerifier({ key: JWT_SECRET })
    const verifiedToken = verify(token)
    const userId = verifiedToken?.userId
    const user = await db.select().from(users).where(eq(users.id, userId))
    if (!user) return
    const { password: _, ...authenticatedUser } = user
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