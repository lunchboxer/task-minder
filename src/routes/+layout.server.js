/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
  return {
    me: event.locals.user,
  }
}
