import { createConnection } from "mysql2/promise";

export async function connectToDatabase() {
  return createConnection({
    host: "localhost",
    user: "root",
    password: "saxroot",
    database: "db_activity_habits",
  });
}
