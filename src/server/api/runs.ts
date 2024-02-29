"use server";
import { unstable_cache as cache } from "next/cache";
import { db } from "../db";
import { zfd } from "zod-form-data";
import { redirect } from "next/navigation";
import { runs } from "../db/schema";

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
  const { runnerName, videoUrl, runnerUrl, time } =
    submitFormSchema.parse(formData);
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
  });
  return redirect("/");
};
