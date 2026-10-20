import { NextResponse } from "next/server";

const AI_AGENTS = [
  // General AI assistants / agents
  "chatgpt",
  "openai",
  "gptbot",
  "oai-searchbot",

  "gemini",
  "google-extended",
  "googlebot",

  "claude",
  "anthropic",

  "grok",
  "xai",

  "perplexity",
  "perplexitybot",

  "deepseek",

  // Open-source / agentic systems
  "openclaw",
  "hermes",

  // Chinese AI
  "baiduspider",
  "erniebot",
  "qwen",
  "tongyi",
  "doubao",
  "bytedance",
  "kimi",
  "moonshot",
  "minimax",
  "zhipu",
  "chatglm",
  "hunyuan",
  "yuanbao",

  // Other common AI crawlers
  "bytespider",
  "cohere",
  "ai2bot",
  "amazonbot",
];

function isAIAgent(userAgent = "") {
  const ua = userAgent.toLowerCase();

  return AI_AGENTS.some((agent) => ua.includes(agent));
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";

  const requestedMarkdown = pathname.endsWith(".md");
  const aiAgent = isAIAgent(userAgent);

  if (requestedMarkdown || aiAgent) {
    const url = request.nextUrl.clone();

    // Remove .md if it exists
    const postPath = pathname
      .replace(/^\/+/, "")
      .replace(/\.md$/, "");

    url.pathname = `/api/raw/${postPath}`;

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
