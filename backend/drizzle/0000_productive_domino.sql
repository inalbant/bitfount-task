CREATE TABLE `reminders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`dayOfWeek` integer NOT NULL,
	`time` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT '"2024-10-29T17:47:06.770Z"' NOT NULL
);
