import { DB_URL_DEV } from '$env/static/private'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { groups, schoolYears, students, subjects, users } from './schema'

const database = new Database(DB_URL_DEV ?? 'local.db')
const db = drizzle(database)

export { db, users, schoolYears, groups, students, subjects }
