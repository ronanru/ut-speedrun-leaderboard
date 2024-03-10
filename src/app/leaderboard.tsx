import { getApprovedRunsByCategory } from "@/server/api/runs";
import { type Run } from "@/server/db/schema";
import Link from "next/link";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export default async function Leaderboard({
  category,
}: {
  category: Run["category"];
}) {
  const allRuns = await getApprovedRunsByCategory(category);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full overflow-hidden rounded-xl text-zinc-200">
        <thead>
          <tr className="rounded-xl border-b border-zinc-800 bg-zinc-900 p-2 text-left">
            <th className="p-2 text-center">#</th>
            <th className="p-2 text-center">Name</th>
            <th className="p-2 text-center">Time</th>
            <th className="p-2 text-center">Date</th>
          </tr>
        </thead>
        <tbody>
          {allRuns.map((run, i) => {
            const milliseconds = (run.timeMillis % 1000)
              .toString()
              .padStart(3, "0");
            const seconds = Math.floor(run.timeMillis / 1000) % 60;
            const minutes = Math.floor(run.timeMillis / 1000 / 60);
            return (
              <tr
                key={run.id}
                className="group border-b border-zinc-800 transition-colors first:text-white last:border-none hover:bg-zinc-900"
              >
                <td className="p-2 text-zinc-400 group-first:py-4 group-first:font-semibold group-first:text-lime-400 group-[:nth-child(2)]:text-yellow-400 group-[:nth-child(3)]:text-orange-400">
                  #{i + 1}
                </td>
                <td className="p-2 group-first:py-4 group-first:font-semibold">
                  <Link
                    href={run.runnerUrl}
                    target="_blank"
                    className="hover:underline"
                  >
                    {run.runnerName}
                  </Link>
                </td>
                <td className="p-2 text-right tabular-nums group-first:py-4 group-first:font-semibold">
                  <Link
                    href={run.videoUrl}
                    target="_blank"
                    className="hover:underline"
                  >
                    {minutes > 0 && (
                      <>
                        {minutes}
                        <span className="text-sm">m</span>{" "}
                      </>
                    )}
                    {seconds}
                    <span className="text-sm">s</span> {milliseconds}
                    <span className="text-sm">ms</span>
                  </Link>
                </td>
                <td className="p-2 text-right group-first:py-4 group-first:font-semibold">
                  {dateFormatter.format(new Date(run.createdAt))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
