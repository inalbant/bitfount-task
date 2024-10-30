import { useState } from "react";
import { ReminderForm } from "./components/ReminderForm";
import { ReminderList } from "./components/ReminderList";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Reminder App</h1>
      <ReminderForm onReminderAdded={() => setRefreshKey((prev) => prev + 1)} />
      <ReminderList key={refreshKey} />
    </div>
  );
}

export default App;
