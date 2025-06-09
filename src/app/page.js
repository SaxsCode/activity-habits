"use client";
import { useState } from "react";
import ActivityGrid from "@/components/ActivityGrid";
import HabitTable from "@/components/HabitTabje";
import NewHabitInput from "@/components/NewHabitInput";
import useHabits from "@/hooks/useHabits";

export default function Home() {
  const { habits, loading, createHabit, updateHabit, deleteHabit } =
    useHabits();
  const [newHabit, setNewHabit] = useState("");

  const handleNewHabit = async () => {
    if (!newHabit.trim()) return;
    await createHabit(newHabit);
    setNewHabit("");
  };

  const activityData = [
    { date: "2025-06-01", completed: 0, tasks: 2 },
    { date: "2025-06-02", completed: 1, tasks: 5 },
    { date: "2026-06-03", completed: 2, tasks: 5 },
    { date: "2025-06-05", completed: 3, tasks: 5 },
    { date: "2025-06-06", completed: 4, tasks: 5 },
    { date: "2025-06-07", completed: 5, tasks: 5 },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <ActivityGrid data={activityData} />
        <p className="text-lg font-semibold mb-2 dark:text-gray-100">
          Activity:
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-lg font-semibold mb-4 dark:text-gray-100">Today:</p>
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Loading...
          </div>
        ) : (
          <>
            <HabitTable
              habits={habits}
              onComplete={updateHabit}
              onDelete={deleteHabit}
            />
            <div className="mt-4">
              <NewHabitInput
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                onBlur={handleNewHabit}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
