import { useEffect, useState } from "react";

export default function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const fetchHabits = async () => {
    setLoading(true);
    const result = await fetch("/api/habits", { cache: "no-store" });
    const data = await result.json();
    setHabits(Array.isArray(data) ? data : []);
    setLoading(false);
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
  const deleteHabit = async (habitId) => {
    const result = await fetch("/api/habits", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: habitId }),
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
    loading,
    createHabit,
    updateHabit,
    deleteHabit,
    fetchHabits,
    fetchActivityLogs,
  };
}
