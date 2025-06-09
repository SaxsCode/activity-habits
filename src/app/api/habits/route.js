import { connectToDatabase } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let date = searchParams.get("date");
    const connection = await connectToDatabase();

    if (date === null) {
      date = new Date().toISOString().slice(0, 10);
    }

    let [rows] = await connection.execute(
      `
      SELECT 
        log.id AS log_id,
        log.date,
        log.completed,
        habit.id AS habit_id,
        habit.title
      FROM habits_log AS log
      INNER JOIN habits AS habit ON habit.id = log.habit_id
      WHERE log.date = ?
    `,
      [date],
    );

    // if log is not set yet
    if (rows.length === 0) {
      const [fallbackRows] = await connection.execute(`
        SELECT 
          habit.id AS habit_id,
          habit.title
        FROM habits AS habit
        WHERE habit.active = 1
      `);

      const insertedLogs = [];
      for (const habit of fallbackRows) {
        const [result] = await connection.execute(
          "INSERT INTO habits_log (habit_id, date, completed) VALUES (?, CURDATE(), 0)",
          [habit.habit_id],
        );
        insertedLogs.push({
          log_id: result.insertId,
          date: "CURDATE()",
          completed: 0,
          habit_id: habit.habit_id,
          title: habit.title,
        });
      }

      rows = insertedLogs;
    }

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
      "INSERT INTO `habits` (title, created_at, active) VALUES (?, NOW(), 1)",
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
      "DELETE FROM `habits_log` WHERE habit_id = ? AND date = CURDATE()",
      [id],
    );

    const [update] = await connection.execute(
      "UPDATE `habits` SET active = 0 WHERE id = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Habit not found" }), {
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

export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, completed } = data;
    const connection = await connectToDatabase();

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing log ID " }), {
        status: 400,
      });
    }

    const [result] = await connection.execute(
      "UPDATE `habits_log` SET completed = ? WHERE id = ?",
      [completed, id],
    );

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Habit not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Habit updated" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
