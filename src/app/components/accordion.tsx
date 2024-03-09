export const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <details className="group w-full">
    <summary className="flex cursor-pointer justify-between rounded-lg bg-zinc-900 px-4 py-2">
      {title}
      <svg
        className="transform transition-transform group-open:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
    <div className="pt-2">{children}</div>
  </details>
);
