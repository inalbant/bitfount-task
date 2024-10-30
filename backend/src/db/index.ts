import { drizzle } from "drizzle-orm/libsql";
import type { reminders } from "./schema.js";

export const db = drizzle("file:sqlite.db");

// Export the schema for type inference
export type Reminder = typeof reminders.$inferSelect;
export type NewReminder = typeof reminders.$inferInsert;
