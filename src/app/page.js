"use client";
import { useEffect, useState } from "react";
import ActivityGrid from "@/components/ActivityGrid";
import HabitTable from "@/components/HabitTable";
import NewHabitInput from "@/components/NewHabitInput";
import useHabits from "@/hooks/useHabits";
import { prepareActivityData } from "@/lib/prepareActivityData";

export default function Home() {
  const {
    habits,
    loading,
    createHabit,
    updateHabit,
    deleteHabit,
    fetchActivityLogs,
  } = useHabits();
  const [newHabit, setNewHabit] = useState("");
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    async function loadActivity() {
      const logs = await fetchActivityLogs();
      console.log(logs);
      const data = await prepareActivityData(logs, 364);
      setActivityData(data);
    }
    loadActivity();
  }, []); // Only runs once on mount

  const handleNewHabit = async () => {
    if (!newHabit.trim()) return;
    await createHabit(newHabit);
    setNewHabit("");
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-center mb-6">
        <div className="w-[1036px]">
          <p className="text-lg font-semibold mb-2 dark:text-gray-100">
            Activity:
          </p>
          <ActivityGrid data={activityData} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-[1036px]">
          <p className="text-lg font-semibold mb-4 dark:text-gray-100">
            Today:
          </p>
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
    </div>
  );
}
