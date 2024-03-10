import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

export const runtime = "edge";
// Prod database is in Stockholm
export const preferredRegion = "arn1";
export const metadata = {
  title: "UploadThing Speedrunning",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`mx-auto flex min-h-screen max-w-xl flex-col gap-8 bg-zinc-950 p-8 font-sans text-zinc-50 ${GeistSans.variable}`}
      >
        <main className="flex-1 space-y-8">{children}</main>
        <footer className="text-center text-sm text-gray-400">
          <p>
            Made by{" "}
            <Link
              href="https://matvey.dev"
              target="_blank"
              className="underline"
            >
              Matvey
            </Link>
          </p>
          <Link
            href="https://github.com/ronanru/ut-speedrun-leaderboard"
            target="_blank"
            className="underline"
          >
            Open source on GitHub
          </Link>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
