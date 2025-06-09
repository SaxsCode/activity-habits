export default function HabitTable({ habits, onComplete, onDelete }) {
  return (
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
              <td className="py-2 px-4 dark:text-gray-100">{habit.title}</td>
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() =>
                    onComplete(habit.log_id, habit.completed === 1 ? 0 : 1)
                  }
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </td>
              <td className="py-2 px-4">
                <button
                  type="button"
                  onClick={() => onDelete(habit.habit_id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-bold"
                  aria-label="Delete habit"
                >
                  ×
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
