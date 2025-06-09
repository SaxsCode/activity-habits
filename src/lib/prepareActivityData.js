import { generateDateRange } from "./dateUtils";

export function prepareActivityData(logs, days = 364) {
  const logMap = {};
  const totalHabitsMap = {};

  logs.forEach((log) => {
    logMap[log.date] = log.completed;
    totalHabitsMap[log.date] = log.totalHabits;
  });

  const allDates = generateDateRange(days);
  return allDates.map((date) => ({
    date,
    completed: logMap[date] || 0,
    totalHabits: totalHabitsMap[date] || 0,
  }));
}
