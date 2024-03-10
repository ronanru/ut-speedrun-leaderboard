import { github } from "@/server/auth";
import { ratelimit } from "@/server/ratelimit";
import { generateState } from "arctic";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
import { env } from "process";

export async function GET(request: NextRequest): Promise<Response> {
  const limit = await ratelimit?.limit(request.ip ?? "anonymous");
  if (limit && !limit.success)
    return new Response("Too many requests", {
      status: 429,
    });

  const state = generateState();
  const url = await github.createAuthorizationURL(state);

  cookies().set("github_oauth_state", state, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 600,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
