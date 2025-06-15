export default function HabitTable({
  habits,
  onComplete,
  onDelete,
  selectedDate,
}) {
  return (
    <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
      <tbody>
        {habits.length === 0 ? (
          <tr>
            <td
              colSpan={2}
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
              <td className="py-2 px-4 text-right">
                <div className="flex items-center justify-end gap-4">
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() =>
                      onComplete(
                        habit.log_id,
                        habit.completed === 1 ? 0 : 1,
                        selectedDate,
                      )
                    }
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    style={{ transition: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => onDelete(habit.habit_id, selectedDate)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-bold text-lg focus:outline-none focus:underline"
                    aria-label="Delete habit"
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
