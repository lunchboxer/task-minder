import { db, students as studentModel } from '$lib/data'

export async function load() {
  const students = await db.select().from(studentModel)
  return {
    students,
  }
}
