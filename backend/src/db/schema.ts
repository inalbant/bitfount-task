import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const reminders = sqliteTable("reminders", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  dayOfWeek: int().notNull(), // 0-6 representing Sunday-Saturday
  time: text().notNull(), // HH:mm format
  userId: text().notNull(),
  createdAt: int({ mode: "timestamp" }).notNull().default(new Date()),
});
