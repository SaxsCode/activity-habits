import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(`
      SELECT 
        log.id AS log_id,
        log.date,
        habit.id AS habit_id,
        habit.title
      FROM habits_log AS log
      INNER JOIN habits AS habit ON habit.id = log.habit_id
      WHERE log.date = CURDATE()
    `);

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

export async function POST(request) {
  try {
    const data = await request.json();
    const { title } = data;
    const connection = await connectToDatabase();

    // insert habit
    const [row] = await connection.execute(
      "INSERT INTO `habits` (title, created_at) VALUES (?, NOW())",
      [title],
    );

    if (!row.affectedRows) {
      return new Response(JSON.stringify({ error: "Could not insert habit" }), {
        status: 404,
      });
    }

    // insert log
    const [log] = await connection.execute(
      "INSERT INTO `habits_log` (habit_id, date, completed) VALUES (?, NOW(), 0)",
      [row.insertId],
    );

    if (!log.affectedRows) {
      return new Response(
        JSON.stringify({ error: "Could not insert habit log" }),
        {
          status: 404,
        },
      );
    }

    return new Response(JSON.stringify({ id: row.insertId, title }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    const data = await request.json();
    const { id } = data;
    const connection = await connectToDatabase();

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing habit ID " }), {
        status: 400,
      });
    }

    const [result] = await connection.execute(
      "DELETE FROM `habits` WHERE id = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return new Respone(JSON.stringify({ error: "Habit not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Habit deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
