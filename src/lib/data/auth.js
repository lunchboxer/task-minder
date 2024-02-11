import { dev } from '$app/environment'
import { JWT_SECRET } from '$env/static/private'
import { db } from '$lib/data'
import { users } from '$lib/data/schema'
import { eq } from 'drizzle-orm'
import { jwtVerify } from 'jose'

export const getUserFromCookies = async cookies => {
  if (!cookies.token) return
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const { payload } = await jwtVerify(cookies.token, secret)
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, payload.id))
    if (!user) return
    const { password: _, ...authenticatedUser } = user
    return authenticatedUser
  } catch (error) {
    dev && console.error('getUserFromCookies error', error)
  }
}
