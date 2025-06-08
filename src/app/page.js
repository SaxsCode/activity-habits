import Image from "next/image";

export default async function Home() {
  const result = await fetch("http://localhost:3000/api/habits", {
    cache: "no-store",
  });

  const habits = await result.json();

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
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id}>
                <td>{habit.title}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
