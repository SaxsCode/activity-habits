"use client";
import { useEffect, useState } from "react";
import ActivityGrid from "@/components/ActivityGrid";
import HabitTable from "@/components/HabitTable";
import NewHabitInput from "@/components/NewHabitInput";
import useHabits from "@/hooks/useHabits";
import { prepareActivityData } from "@/lib/prepareActivityData";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const router = useRouter();

  const {
    habits,
    fetchHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    fetchActivityLogs,
  } = useHabits(user);

  const [newHabit, setNewHabit] = useState("");
  const [activityData, setActivityData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function ensureUserInDb() {
      if (session?.user) {
        const result = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: session.user }),
        });
        const data = await result.json();
        setUser(data.user);
      }
    }
    ensureUserInDb();
  }, [session]);

  useEffect(() => {
    if (!user || selectedDate === null) return;
    fetchHabits(selectedDate);
  }, [selectedDate, user]);

  useEffect(() => {
    async function loadActivity() {
      if (!user) return;
      const logs = await fetchActivityLogs();
      const data = await prepareActivityData(logs, 364);
      setActivityData(data);
    }
    loadActivity();
  }, [habits, user]);

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
          <ActivityGrid data={activityData} onDayClick={setSelectedDate} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-[1036px]">
          <p className="text-lg font-semibold mb-4 dark:text-gray-100">
            {selectedDate ? selectedDate : "Today"}:
          </p>
          <>
            <HabitTable
              habits={habits}
              onComplete={updateHabit}
              onDelete={deleteHabit}
              selectedDate={selectedDate}
            />
            {selectedDate ? (
              ""
            ) : (
              <div className="mt-4">
                <NewHabitInput
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  onBlur={handleNewHabit}
                />
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
