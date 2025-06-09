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
    <div>
      <div className="activity">
        <p>Activity:</p>
        {/* TODO: render table with blocks for each day */}
      </div>
      <div className="habits">
        <p>Today:</p>
        <table>
          <thead>
            <tr>
              <th>Habit</th>
              <th>Complete</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {habits.length === 0 ? (
              <tr>
                <td colSpan={3}>No habits found.</td>
              </tr>
            ) : (
              habits.map((habit) => (
                <tr key={habit.habit_id}>
                  <td>{habit.title}</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(habit.habit_id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))
            )}
            <tr key="new-habit">
              <td>
                <input
                  type="text"
                  value={newHabit}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Add new habit"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
