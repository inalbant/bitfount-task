import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import axios from "axios";
import { ReminderForm } from "./ReminderForm";

vi.mock("axios");

describe("ReminderForm", () => {
  it("submits the form with correct data", async () => {
    const mockOnReminderAdded = vi.fn();
    render(<ReminderForm onReminderAdded={mockOnReminderAdded} />);

    const titleInput = screen.getByLabelText(/reminder title/i);
    const daySelect = screen.getByLabelText(/day of week/i);
    const timeInput = screen.getByLabelText(/time/i);

    fireEvent.change(titleInput, { target: { value: "Walk the dog" } });
    fireEvent.change(daySelect, { target: { value: "1" } });
    fireEvent.change(timeInput, { target: { value: "08:00" } });

    const submitButton = screen.getByRole("button", { name: /add reminder/i });
    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/reminders", {
      title: "Walk the dog",
      dayOfWeek: 1,
      time: "08:00",
      userId: "user1",
    });
  });
});
