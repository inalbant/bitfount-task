import { useState } from "react";
import axios from "axios";

interface ReminderFormProps {
  onReminderAdded: () => void;
}

export function ReminderForm({ onReminderAdded }: ReminderFormProps) {
  const [title, setTitle] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("1");
  const [time, setTime] = useState("08:00");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/reminders", {
        title,
        dayOfWeek: parseInt(dayOfWeek),
        time,
        userId: "user1", // Simplified user identification
      });
      setTitle("");
      onReminderAdded();
    } catch (error) {
      console.error("Failed to create reminder:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title">Reminder Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 ml-2"
        />
      </div>
      <div>
        <label htmlFor="dayOfWeek">Day of Week:</label>
        <select
          id="dayOfWeek"
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
          className="border p-2 ml-2"
        >
          <option value="0">Sunday</option>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Saturday</option>
        </select>
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="border p-2 ml-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Reminder
      </button>
    </form>
  );
}
