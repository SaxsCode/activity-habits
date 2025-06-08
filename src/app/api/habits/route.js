import { connectToDatabase } from "@/lib/db";

export async function GET(request) {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute("SELECT * FROM habits");

    await connection.end();

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Habits not found." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
