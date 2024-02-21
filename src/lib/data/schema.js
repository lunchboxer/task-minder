import { relations, sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const users = sqliteTable('users', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid(12)),
  username: text('username').notNull().unique(),
  name: text('name'),
  password: text('password').notNull(),
  activeSchoolYear: text('active_school_year'),
  created: text('created').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const usersRelations = relations(users, ({ many }) => ({
  teachersToGroups: many(teachersToGroups),
}))

export const students = sqliteTable('students', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid(12)),
  name: text('name').notNull(),
  archived: integer('archived', { mode: 'boolean' }).notNull().default(0),
  created: text('created').notNull().default(sql`CURRENT_TIMESTAMP`),
})

// students can belong to zero, one, or many groups
export const studentsRelations = relations(students, ({ many }) => ({
  studentsToGroups: many(studentsToGroups),
}))

export const groups = sqliteTable('groups', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid(12)),
  name: text('name').notNull(),
  grade: text('grade').notNull(),
  schoolYearId: text('school_year_id')
    .references(() => schoolYears.id)
    .notNull(),
  created: text('created').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const groupsRelations = relations(groups, ({ many, one }) => ({
  studentsToGroups: many(studentsToGroups),
  teachersToGroups: many(teachersToGroups),
  schoolYear: one(schoolYears, {
    fields: [groups.schoolYearId],
    references: [schoolYears.id],
  }),
}))

export const teachersToGroups = sqliteTable(
  'teachers_to_groups',
  {
    teacherId: text('teacher_id')
      .notNull()
      .references(() => users.id),
    groupId: text('group_id')
      .notNull()
      .references(() => groups.id),
  },
  table => ({
    pk: primaryKey({ columns: [table.teacherId, table.groupId] }),
  }),
)

export const teachersToGroupsRelations = relations(
  teachersToGroups,
  ({ one }) => ({
    group: one(groups, {
      fields: [teachersToGroups.groupId],
      references: [groups.id],
    }),
    teacher: one(users, {
      fields: [teachersToGroups.teacherId],
      references: [users.id],
    }),
  }),
)

export const studentsToGroups = sqliteTable(
  'students_to_groups',
  {
    studentId: text('student_id')
      .notNull()
      .references(() => students.id),
    groupId: text('group_id')
      .notNull()
      .references(() => groups.id),
  },
  table => ({
    pk: primaryKey({ columns: [table.studentId, table.groupId] }),
  }),
)

export const studentsToGroupsRelations = relations(
  studentsToGroups,
  ({ one }) => ({
    group: one(groups, {
      fields: [studentsToGroups.groupId],
      references: [groups.id],
    }),
    student: one(students, {
      fields: [studentsToGroups.studentId],
      references: [students.id],
    }),
  }),
)

export const schoolYears = sqliteTable('school_years', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid(12)),
  name: text('name').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  created: text('created').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const schoolYearsRelations = relations(schoolYears, ({ many }) => ({
  groups: many(groups),
}))

export const subjects = sqliteTable('subjects', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid(12)),
  name: text('name').notNull().unique(),
})

export const assignments = sqliteTable('assignments', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid(12)),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type', { enum: ['classwork', 'homework'] })
    .notNull()
    .default('homework'),
  subjectId: text('subject_id')
    .notNull()
    .references(() => subjects.id),
  groupId: text('group_id')
    .notNull()
    .references(() => groups.id),
  assignedDate: text('assigned_date').notNull(),
  dueDate: text('due_date'),
  created: text('created').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const assignmentsRelations = relations(assignments, ({ many, one }) => ({
  group: one(groups, {
    fields: [assignments.groupId],
    references: [groups.id],
  }),
  subject: one(subjects, {
    fields: [assignments.subjectId],
    references: [subjects.id],
  }),
  submissions: many(submissions),
}))

export const submissions = sqliteTable('submissions', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid(12)),
  assignmentId: text('assignment_id')
    .notNull()
    .references(() => assignments.id),
  studentId: text('student_id')
    .notNull()
    .references(() => students.id),
  status: text('status', {
    enum: [
      'done',
      'incomplete',
      'late',
      'needs_correction',
      'absent',
      'not_submitted',
      'n/a',
    ],
  }),
  created: text('created').notNull().default(sql`CURRENT_TIMESTAMP`),
})

export const submissionsRelations = relations(submissions, ({ one }) => ({
  assignment: one(assignments, {
    fields: [submissions.assignmentId],
    references: [assignments.id],
  }),
  student: one(students, {
    fields: [submissions.studentId],
    references: [students.id],
  }),
}))
