import { connectToDatabase } from "@/lib/db";
import { getUserByEmail, insertUser } from "@/app/model/user";

export async function POST(request) {
  try {
    const { user } = await request.json();

    const existing = await getUserByEmail(user.email);
    if (!existing) {
      existing = await insertUser(user.email);
    }

    const userFromDb = existing;

    return Response.json({ user: userFromDb });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
