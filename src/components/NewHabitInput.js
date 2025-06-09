export default function NewHabitInput({ value, onChange, onBlur }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder="Add new habit"
      className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-gray-900 dark:text-gray-100"
    />
  );
}
