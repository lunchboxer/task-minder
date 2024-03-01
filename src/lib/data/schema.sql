CREATE TABLE `assignment` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text DEFAULT 'homework' NOT NULL,
	`subject_id` text NOT NULL,
	`student_group_id` text NOT NULL,
	`assigned_date` text NOT NULL,
	`due_date` text,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`student_group_id`) REFERENCES `student_group`(`id`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE `student_group` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`grade` text NOT NULL,
	`school_year_id` text NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`school_year_id`) REFERENCES `school_year`(`id`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE `school_year` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE `student` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`archived` integer DEFAULT 0 NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE `student_to_group` (
	`student_id` text NOT NULL,
	`student_group_id` text NOT NULL,
	PRIMARY KEY(`student_group_id`, `student_id`),
	FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`student_group_id`) REFERENCES `student_group`(`id`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE `subject` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
CREATE TABLE `submission` (
	`id` text PRIMARY KEY NOT NULL,
	`assignment_id` text NOT NULL,
	`student_id` text NOT NULL,
	`status` text,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE `teacher_to_group` (
	`teacher_id` text NOT NULL,
	`student_group_id` text NOT NULL,
	PRIMARY KEY(`student_group_id`, `teacher_id`),
	FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`student_group_id`) REFERENCES `student_group`(`id`) ON UPDATE no action ON DELETE no action
);
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`name` text,
	`password` text NOT NULL,
	`active_school_year` text,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE UNIQUE INDEX `subject_name_unique` ON `subject` (`name`);
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);

CREATE TABLE `role` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL
);
CREATE TABLE `user_role` (
  `user_id` text NOT NULL,
  `role_id` text NOT NULL,
  PRIMARY KEY(`role_id`, `user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
  FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON UPDATE no action ON DELETE no action
)
