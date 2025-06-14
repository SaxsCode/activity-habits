import { connectToDatabase } from "@/lib/db";

export async function getUserByEmail(email) {
  try {
    const connection = await connectToDatabase();

    const [rows] = await connection.execute(
      ` SELECT * FROM users WHERE email = ? `,
      [email],
    );

    await connection.end();

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

export async function insertUser(email) {
  try {
    const connection = await connectToDatabase();

    const [row] = await connection.execute(
      "INSERT INTO `users` (email) VALUES (?)",
      [email],
    );

    if (!row.affectedRows) {
      throw new Error("Could not insert user");
    }

    return { id: row.insertId, email };
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
