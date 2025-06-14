import { connectToDb } from "@/lib/db";
import { getUserByEmail, insertUser } from "@/lib/userModel";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { user } = req.body;
  await connectToDb();

  const existing = await getUserByEmail(user.email);
  if (!existing) {
    await insertUser(user); // implement this in your user model
  }

  res.status(200).json({ ok: true });
}
