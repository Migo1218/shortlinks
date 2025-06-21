import bcrypt from "bcrypt";
import { generateIdFromEntropySize } from "lucia";
import type { APIContext } from "astro";
import { User } from "../../../db/adapter";
import { lucia } from "../../../auth";

export async function POST(context: APIContext) {
  const formData = await context.request.formData();
  const password = formData.get("password")?.toString();

  const userId = generateIdFromEntropySize(10);

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  await User.create({
    _id: userId,
    username: formData.get("name")?.toString(),
    password: hash,
    email: formData.get("email")?.toString(),
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(JSON.stringify({ userId }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
