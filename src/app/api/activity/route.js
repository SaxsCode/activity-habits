import { connectToDatabase } from "@/lib/db";

export async function GET(request) {
  try {
    const connection = await connectToDatabase();
    const [logs] = await connection.execute(`
        SELECT 
            DATE_FORMAT(date, '%Y-%m-%d') AS date,
            CAST(SUM(completed = 1) AS UNSIGNED) AS completed,
            COUNT(*) AS totalHabits
        FROM habits_log
        WHERE date >= DATE_SUB(CURDATE(), INTERVAL 364 DAY)
        GROUP BY DATE(date)
        ORDER BY DATE(date) ASC
    `);
    await connection.end();

    return new Response(JSON.stringify(logs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
