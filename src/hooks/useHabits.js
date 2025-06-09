import { useEffect, useState } from "react";

export default function useHabits() {
  const [habits, setHabits] = useState([]);

  // Create
  const createHabit = async (title) => {
    const result = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (result.ok) {
      await fetchHabits();
    }
  };

  // Read
  const fetchHabits = async (selectedDate = null) => {
    const url = selectedDate
      ? `/api/habits?date=${encodeURIComponent(selectedDate)}`
      : "/api/habits";

    const result = await fetch(url, {
      cache: "no-store",
    });
    const data = await result.json();
    setHabits(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // Update
  const updateHabit = async (logId, completed) => {
    const result = await fetch("/api/habits", {
      method: "PUT",
      headers: { "Content-Type": "applicaton/json" },
      body: JSON.stringify({ id: logId, completed }),
    });
    if (result.ok) {
      await fetchHabits();
    }
  };

  // Delete
  const deleteHabit = async (habitId, selectedDate = null) => {
    const result = await fetch("/api/habits", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: habitId, date: selectedDate }),
    });
    if (result.ok) {
      setHabits(habits.filter((habit) => habit.habit_id !== habitId));
    }
  };

  // Activity
  const fetchActivityLogs = async () => {
    const result = await fetch("/api/activity");
    if (!result.ok) throw new Error("Failed to fetch activity logs");
    return result.json();
  };

  return {
    habits,
    fetchHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    fetchHabits,
    fetchActivityLogs,
  };
}
