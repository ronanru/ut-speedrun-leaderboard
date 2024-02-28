import "@/styles/globals.css";

import { Inter } from "next/font/google";

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
        className={`mx-auto max-w-lg space-y-8 bg-zinc-950 p-8 font-sans text-zinc-50 ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
