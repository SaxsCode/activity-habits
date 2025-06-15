import React from "react";

function getColor(count, total) {
  if (!total || total === 0) return "bg-gray-800";
  if (count === 0) return "bg-gray-800";
  const percentage = (count / total) * 100;

  if (percentage === 100) return "bg-blue-400";
  if (percentage >= 75) return "bg-blue-300";
  if (percentage >= 50) return "bg-gray-400";
  if (percentage >= 25) return "bg-gray-500";
  return "bg-gray-600";
}

export default function ActivityGrid({ data, onDayClick }) {
  if (!data || data.length === 0) {
    return <div>No activity data</div>;
  }

  const weeks = [];
  let week = [];

  data.forEach((entry, i) => {
    week.push(entry);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week);

  return (
    <div className="flex">
      {weeks.map((week, i) => (
        <div key={i} className="flex flex-col mr-1">
          {week.map((day, j) => {
            return (
              <div
                onClick={() => onDayClick(day.date)}
                key={j}
                className={`w-4 h-4 mb-1 rounded ${getColor(day.completed, day.totalHabits)}`}
                title={`${day.date}: ${day.completed} completed`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
