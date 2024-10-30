import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { reminders } from "./db/schema.js";
import { db } from "./db/index.js";

const app = new Hono();
app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/reminders", async (c) => {
  const allReminders = await db.select().from(reminders);
  return c.json(allReminders);
});

app.post("/reminders", async (c) => {
  const { title, dayOfWeek, time, userId } = await c.req.json();

  const [newReminder] = await db
    .insert(reminders)
    .values({
      title,
      dayOfWeek,
      time,
      userId,
      createdAt: new Date(),
    })
    .returning();

  return c.json(newReminder);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
