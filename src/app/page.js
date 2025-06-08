import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="activity">
        <p>Activity:</p>
        {/* TODO: render table with blocks for each day */}
      </div>
      <div className="habits">
        <p>Today:</p>
        <table>
          <tr>
            <th>Habit</th>
            <th>Completed</th>
          </tr>
          <tr>
            <td>Programmeren</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
