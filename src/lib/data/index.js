import { DB_URL_DEV } from '$env/static/private'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { groups, schoolYears, students, subjects, users } from './schema'

export const database = new Database(DB_URL_DEV ?? 'local.db')
const db = drizzle(database)

export { db, users, schoolYears, groups, students, subjects }

// make a parameterized query but write it as a string
export const sql = (strings, ...values) => ({
  query: strings.reduce((prev, curr, i) => {
    const value = values[i] ? '?' : ''
    return prev + curr + value
  }, ''),
  values: values.filter(value => value !== undefined),
})

database.pragma('journal_mode = WAL')

// export const query = (query, values) => {
//   if (typeof query === 'object') {
//     const stmt = database.prepare(query.query)
//     return stmt.all(...query.values)
//   }
//   return database.prepare(query).all(...values)
// }
