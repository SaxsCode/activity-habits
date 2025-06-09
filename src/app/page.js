"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  // -- Create
  const handleInputChange = (e) => {
    setNewHabit(e.target.value);
  };

  const handleInputBlur = async () => {
    if (!newHabit.trim()) return;
    const result = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newHabit }),
    });
    if (result.ok) {
      const created = await result.json();
      setHabits([...habits, created]);
      setNewHabit("");
    }
  };

  // -- Read
  useEffect(() => {
    fetch("/api/habits", { cache: "no-store" })
      .then((result) => result.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHabits(data);
        } else {
          setHabits([]);
        }
      });
  }, []);

  //-- Update
  const handleComplete = async (logId, completed) => {
    completed = completed === 1 ? 0 : 1;

    const result = await fetch("/api/habits", {
      method: "PUT",
      headers: { "Content-Type": "applicaton/json" },
      body: JSON.stringify({ id: logId, completed: completed }),
    });
    if (result.ok) {
      const refreshed = await fetch("/api/habits", { cache: "no-store" });
      const updatedHabits = await refreshed.json();
      setHabits(Array.isArray(updatedHabits) ? updatedHabits : []);
    }
  };

  // -- Delete
  const handleDelete = async (habitId) => {
    const result = await fetch("/api/habits", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: habitId }),
    });
    if (result.ok) {
      setHabits(habits.filter((habit) => habit.habit_id !== habitId));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2 dark:text-gray-100">
          Activity:
        </p>
        {/* TODO: render table with blocks for each day */}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-lg font-semibold mb-4 dark:text-gray-100">Today:</p>
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="py-2 px-4 text-left font-medium dark:text-gray-100">
                Habit
              </th>
              <th className="py-2 px-4 text-left font-medium dark:text-gray-100">
                Complete
              </th>
              <th className="py-2 px-4 text-left font-medium dark:text-gray-100">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {habits.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No habits found.
                </td>
              </tr>
            ) : (
              habits.map((habit) => (
                <tr
                  key={habit.habit_id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="py-2 px-4 dark:text-gray-100">
                    {habit.title}
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={habit.completed}
                      onChange={() =>
                        handleComplete(habit.log_id, habit.completed)
                      }
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button
                      type="button"
                      onClick={() => handleDelete(habit.habit_id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-bold"
                      aria-label="Delete habit"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))
            )}
            <tr
              key="new-habit"
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newHabit}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Add new habit"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-gray-900 dark:text-gray-100"
                />
              </td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
