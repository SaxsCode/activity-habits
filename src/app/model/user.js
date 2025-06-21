import { connectToDatabase } from "@/lib/db";

export async function getUserByEmail(email) {
  try {
    const connection = await connectToDatabase();

    const [user] = await connection.execute(
      ` SELECT * FROM users WHERE email = ? LIMIT 1 `,
      [email],
    );

    await connection.end();

    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

export async function insertUser(email) {
  try {
    const connection = await connectToDatabase();

    const [user] = await connection.execute(
      "INSERT INTO `users` (email) VALUES (?)",
      [email],
    );

    await connection.end();

    if (!user.affectedRows) {
      throw new Error("Could not insert user");
    }

    return { id: user.insertId, email };
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
