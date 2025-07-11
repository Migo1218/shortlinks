import type { APIContext } from "astro";
import { lucia } from "../../../auth";

export async function POST(context: APIContext) {
  if (!context.locals.session) {
    return new Response(null, { status: 401 });
  }

  await lucia.invalidateSession(context.locals.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(null, { status: 200 });
}
