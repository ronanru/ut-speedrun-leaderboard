import { getAllRuns } from "@/server/api/runs";
import Link from "next/link";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export default async function HomePage() {
  const allRuns = await getAllRuns();
  return (
    <>
      <h1 className="text-center text-3xl font-bold text-white">
        UploadThing Speedrunning
      </h1>
      <details className="w-full">
        <summary className="cursor-pointer">Speedrun rules</summary>
        <ol className="list-inside list-decimal">
          <li>UT Project and project init are included in the run</li>
          <li>You can use any framework</li>
          <li>Speedrun ends when you upload any file</li>
          <li>You can only copy code from the docs</li>
        </ol>
      </details>
      <details className="w-full">
        <summary className="cursor-pointer">How to submit a run</summary>Please
        submit on our{" "}
        <Link href="/submit" className="underline">
          submit page
        </Link>
        . <br />
        <strong>
          Before the submittion, please delete the UT Project or reset the API
          Key!
        </strong>
      </details>
      <div className="w-full overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full overflow-hidden rounded-xl">
          <thead>
            <tr className="rounded-xl border-b border-zinc-800 bg-zinc-900 p-2 text-left">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Time</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {allRuns.map((run, i) => {
              const milliseconds = run.timeMillis % 1000;
              const seconds = Math.floor(run.timeMillis / 1000) % 60;
              const minutes = Math.floor(run.timeMillis / 1000 / 60);
              return (
                <tr
                  key={run.id}
                  className="border-b border-zinc-800 transition-colors last:border-none hover:bg-zinc-900"
                >
                  <td className="p-2">#{i + 1}</td>
                  <td className="p-2">
                    <Link
                      href={run.runnerUrl}
                      target="_blank"
                      className="hover:underline"
                    >
                      {run.runnerName}
                    </Link>
                  </td>
                  <td className="p-2">
                    <Link
                      href={run.videoUrl}
                      target="_blank"
                      className="hover:underline"
                    >
                      {minutes}
                      <span className="text-sm">m</span> {seconds}
                      <span className="text-sm">s</span> {milliseconds}
                      <span className="text-sm">ms</span>
                    </Link>
                  </td>
                  <td className="p-2">
                    {dateFormatter.format(new Date(run.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
