import { Link } from "../db/adapter";

export async function GET({ params, redirect }) {
  const { id } = params;
  const link = await Link.findOne({ short_id: id });
  if (!link) {
    return new Response("Not found", { status: 404 });
  }
  link.views += 1;
  await link.save();

  if (!link) {
    return new Response("Not found", { status: 404 });
  }

  return redirect(link.url, 301);
}
