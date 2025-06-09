import React from "react";

function getColor(count, total) {
  const percentage = (count / total) * 100;

  if (count === 0) return "bg-gray-200";
  if (count < 2) return "bg-green-200";
  if (percentage < 75) return "bg-green-300";
  if (percentage < 100) return "bg-green-400";
  if (percentage === 100) return "bg-blue-400";
}

export default function ActivityGrid({ data }) {
  const weeks = [];
  let week = [];

  data.forEach((entry, i) => {
    week.push(entry);
    if (week.length === 7) {
      week.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week);

  return (
    <div className="flex">
      {weeks.map((week, i) => (
        <div key={i} className="flex flex-col mr-1">
          {week.map((day, j) => (
            <div
              key={j}
              className={`w-4 h-4 mb-1 rounded ${getColor(day.completed, day.tasks)}`}
              title={`${day.date}: ${day.completed} completed`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
