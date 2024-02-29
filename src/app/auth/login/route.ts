import { generateState } from "arctic";
import { github } from "@/server/auth";
import { cookies } from "next/headers";
import { env } from "process";

export async function GET(): Promise<Response> {
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
