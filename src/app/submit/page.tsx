import { validateRequest } from "@/server/auth";
import Link from "next/link";
import { Input } from "../components/input";
import { TimeInput } from "./timeInput";
import { submitForm } from "@/server/api/runs";

export default async function SubmitPage() {
  const auth = await validateRequest();
  if (!auth.user)
    return (
      <>
        <h1 className="text-center text-3xl font-bold text-white">
          Please sign in to submit a run
        </h1>
        <Link
          href="/auth/login"
          className="mx-auto block w-fit rounded-md bg-zinc-100 px-8 py-2 font-medium text-zinc-950 transition-colors hover:bg-white"
        >
          Sign in
        </Link>
      </>
    );

  return (
    <form className="space-y-4" action={submitForm}>
      <h1 className="text-center text-3xl font-bold text-white">
        Submit UT Speedrun
      </h1>
      <Input required label="Your Name" name="runnerName" autoComplete="name" />
      <Input
        required
        label="Link to your run (Please upload to YouTube)"
        name="videoUrl"
        type="url"
      />
      <Input
        required
        label="Your Site (where should users go when they click your name)"
        name="runnerUrl"
        type="url"
      />
      <TimeInput />
      <button className="mx-auto block rounded-md bg-zinc-100 px-8 py-2 text-center font-medium text-zinc-950 transition-colors hover:bg-white">
        Submit
      </button>
    </form>
  );
}
