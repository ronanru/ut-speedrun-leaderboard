import Link from "next/link";
import { Tweet } from "react-tweet";
import { Accordion } from "./components/accordion";
import Leaderboard from "./leaderboard";
import { Tabs } from "./components/tabs";

export default function HomePage() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold text-white">
        UploadThing Speedrunning
      </h1>
      <section className="space-y-4">
        <Accordion title="What is this?">
          <div data-theme="dark" className="-mt-4">
            <Tweet id="1766010819165499851" />
          </div>
        </Accordion>
        <Accordion title="Speedrun rules">
          <div data-theme="dark" className="-mt-4">
            <Tweet id="1766778474696679479" />
          </div>
        </Accordion>
        <Accordion title="How to submit a run">
          Please submit on our{" "}
          <Link href="/submit" className="underline">
            submit page
          </Link>
          . <br />
          <strong>
            Before the submission, please delete the UT Project or reset the API
            Key!
          </strong>
        </Accordion>
      </section>
      <section className="space-y-4">
        <h2 className="text-center text-lg font-medium">
          Leaderboards by speedrun category
        </h2>
        <Tabs
          label="Speedrun categories"
          tabs={[
            {
              value: "upload%",
              label: "Upload% official",
              content: <Leaderboard category="upload%" />,
            },
            {
              value: "invalid",
              label: "Invalidated after rules update",
              content: <Leaderboard category="invalid" />,
            },
          ]}
        />
      </section>
    </>
  );
}
