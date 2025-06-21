import type { APIContext } from "astro";
import { User } from "../../../db/adapter";
import bcrypt from "bcrypt";
import { lucia } from "../../../auth";

export async function POST(context: APIContext) {
  const formData = await context.request.formData();
  const password = formData.get("password")?.toString();
  const email = formData.get("email")?.toString();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(null, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return new Response(null, { status: 401 });
  }

  const session = await lucia.createSession(user._id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(null, { status: 200 });
}
