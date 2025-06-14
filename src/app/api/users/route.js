import { connectToDatabase } from "@/lib/db";
import { getUserByEmail, insertUser } from "@/app/model/user";

export async function POST(request) {
  try {
    const { user } = await request.json();
    await connectToDatabase();

    const existing = await getUserByEmail(user.email);
    if (!existing) {
      await insertUser(user.email);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
