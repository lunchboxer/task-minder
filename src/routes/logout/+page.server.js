import { redirect } from '@sveltejs/kit'
import { dev } from '$app/environment'

export const actions = {
  default: ({ cookies }) => {
    cookies.set('auth', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
      secure: !dev,
    })
    throw redirect(302, '/')
  },
}
