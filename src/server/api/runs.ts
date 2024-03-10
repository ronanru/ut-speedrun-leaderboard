"use server";
import { env } from "@/env";
import { unstable_cache as cache } from "next/cache";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import { validateRequest } from "../auth";
import { db } from "../db";
import { runs } from "../db/schema";
import { ratelimit } from "../ratelimit";

export const getAllRuns = cache(
  () =>
    db.query.runs.findMany({
      where: ({ isApproved }, { eq }) => eq(isApproved, true),
      orderBy: ({ timeMillis }, { asc }) => asc(timeMillis),
    }),
  ["runs"],
  {
    tags: ["runs"],
  },
);

const submitFormSchema = zfd.formData({
  runnerName: zfd.text(),
  videoUrl: zfd.text(),
  runnerUrl: zfd.text(),
  time: zfd.text(),
});

export const submitForm = async (formData: FormData) => {
  const auth = await validateRequest();
  if (!auth.user) throw new Error("Unauthorized");
  const { runnerName, videoUrl, runnerUrl, time } =
    submitFormSchema.parse(formData);
  const limit = await ratelimit?.limit(auth.user.id);
  if (limit && !limit.success) throw new Error("Rate limited");
  const timeMillis = time.split(" ").reduce((acc, time) => {
    const [value, unit] = time.match(/\d+|\D+/g) as [string, "m" | "s" | "ms"];
    return (
      acc + parseInt(value) * (unit === "m" ? 60000 : unit === "s" ? 1000 : 1)
    );
  }, 0);
  await db.insert(runs).values({
    runnerName,
    videoUrl,
    runnerUrl,
    timeMillis,
    createdAt: new Date(),
    isApproved: false,
    submittedBy: auth.user.id,
    category: "any%",
  });

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    // Send telegram notification to Matvey
    await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: `New run submitted by ${runnerName} with time ${time}`,
        }),
      },
    );
  }

  return redirect("/");
};
