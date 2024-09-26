"use client"; // Mark this component as a Client Component

import { useState } from "react";
import { create } from "zustand";
import "./DatePicker.css"; // Add this line at the top of your file

// Zustand store to manage global state
const useStore = create((set) => ({
  startDate: null,
  endDate: null,
  recurrencePattern: "daily", // Default pattern is 'Daily'
  updateRecurrence: (pattern) => set({ recurrencePattern: pattern }),
  updateDates: (start, end) => set({ startDate: start, endDate: end }),
}));

const DatePicker = () => {
  const {
    recurrencePattern,
    updateRecurrence,
    startDate,
    endDate,
    updateDates,
  } = useStore();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  // Handle start date change
  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    setSelectedStartDate(startDate);
    updateDates(startDate, selectedEndDate);
  };

  // Handle end date change
  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setSelectedEndDate(endDate);
    updateDates(selectedStartDate, endDate);
  };

  // Handle recurrence pattern change
  const handleRecurrenceChange = (e) => {
    updateRecurrence(e.target.value);
  };

  return (
    <div className="date-picker-container">
      <h1 className="title">Recurring Date Picker</h1>

      {/* Start Date Picker */}
      <div className="date-input">
        <label>Start Date:</label>
        <input type="date" onChange={handleStartDateChange} />
      </div>

      {/* End Date Picker */}
      <div className="date-input">
        <label>End Date:</label>
        <input type="date" onChange={handleEndDateChange} />
      </div>

      {/* Recurrence Pattern Selector */}
      <div className="date-input">
        <label>Recurrence Pattern:</label>
        <select onChange={handleRecurrenceChange} value={recurrencePattern}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Display selected recurrence details */}
      <div className="recurrence-details">
        <h2>Selected Recurrence</h2>
        <p>
          Recurrence Pattern:{" "}
          {recurrencePattern.charAt(0).toUpperCase() +
            recurrencePattern.slice(1)}
        </p>
        <p>
          Start Date: {startDate ? startDate.toDateString() : "Not selected"}
        </p>
        <p>End Date: {endDate ? endDate.toDateString() : "Not selected"}</p>
      </div>
    </div>
  );
};

export default DatePicker;
