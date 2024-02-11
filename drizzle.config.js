/** @type { import("drizzle-kit").Config } */
export default {
  schema: './src/lib/data/schema.js',
  out: './src/lib/data/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: process.env.DB_URL_DEV ?? 'local.db',
  },
}
