import fs from "fs/promises";
import path from "path";

export async function GET(request, { params }) {
  const { path: segments } = await params;

  const filePath = path.join(
    process.cwd(),
    "app",
    ...segments,
    "page.mdx"
  );

  try {
    const markdown = await fs.readFile(filePath, "utf8");

    return new Response(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
      },
    });
  } catch {
    return new Response("Post not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}
