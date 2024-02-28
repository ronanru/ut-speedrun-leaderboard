import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold text-white">
        UploadThing Speedrunning
      </h1>
      <details className="w-full">
        <summary className="cursor-pointer">Speedrun rules</summary>
        <ol className="list-inside list-decimal">
          <li>UT Project and all project is included in the run</li>
          <li>You can use any framework</li>
          <li>Speedrun ends when you upload any file</li>
          <li>You can only copy code from the docs</li>
        </ol>
      </details>
      <details className="w-full">
        <summary className="cursor-pointer">How to submit a run</summary>I will
        create a submittion form here, but for now you can{" "}
        <Link href="https://twitter.com/matveydev" className="underline">
          dm me on twitter
        </Link>
      </details>
      <div className="rounded-xl border border-zinc-900">
        <table className="w-full overflow-hidden rounded-xl">
          <thead>
            <tr className="rounded-xl bg-zinc-900 p-2">
              <th className="p-2"></th>
              <th className="p-2">Name</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">#1</td>
              <td className="p-2">
                <Link
                  href="https://twitter.com/t3dotgg"
                  target="_blank"
                  className="hover:underline"
                >
                  Theo
                </Link>
              </td>
              <td className="p-2">
                <Link
                  href="https://www.youtube.com/watch?v=rkva6WYb5mM"
                  target="_blank"
                  className="hover:underline"
                >
                  1m 42s 17ms
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
