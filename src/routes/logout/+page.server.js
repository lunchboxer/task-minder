import { redirect } from '@sveltejs/kit'

export const actions = {
  default: ({ cookies }) => {
    cookies.delete('auth', { path: '/' })
    throw redirect(302, '/')
  },
}
