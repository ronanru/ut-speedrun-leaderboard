import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
        className={`mx-auto flex min-h-screen max-w-lg flex-col gap-8 bg-zinc-950 p-8 font-sans text-zinc-50 ${inter.variable}`}
      >
        <main className="flex-1 space-y-8">{children}</main>
        <footer className="text-center text-sm">
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
      </body>
    </html>
  );
}
