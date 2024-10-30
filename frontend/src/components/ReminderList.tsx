import { useEffect, useState } from "react";
import axios from "axios";

interface Reminder {
  id: number;
  title: string;
  dayOfWeek: number;
  time: string;
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function ReminderList() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const fetchReminders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/reminders");
      setReminders(response.data);
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentTime = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      reminders.forEach((reminder) => {
        if (
          reminder.dayOfWeek === currentDay &&
          reminder.time === currentTime
        ) {
          alert(`Reminder: ${reminder.title}`);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [reminders]);

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Your Reminders</h2>
      <ul className="space-y-2">
        {reminders.map((reminder) => (
          <li key={reminder.id} className="border p-4 rounded">
            {reminder.title} - Every {DAYS[reminder.dayOfWeek]} at{" "}
            {reminder.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
