import { connectToDatabase } from "@/lib/db";

export async function getUserByEmail(email) {
  let connection;
  try {
    connection = await connectToDatabase();

    const [user] = await connection.execute(
      ` SELECT * FROM users WHERE email = ? LIMIT 1 `,
      [email],
    );

    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function insertUser(email) {
  let connection;
  try {
    connection = await connectToDatabase();

    const [user] = await connection.execute(
      "INSERT INTO `users` (email) VALUES (?)",
      [email],
    );

    if (!user.affectedRows) {
      throw new Error("Could not insert user");
    }

    return { id: user.insertId, email };
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
