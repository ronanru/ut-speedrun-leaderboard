"use client";
import * as ReactTabs from "@radix-ui/react-tabs";

export const Tabs = <TValue extends string>({
  tabs,
  label,
}: {
  label: string;
  tabs: {
    value: TValue;
    label: React.ReactNode;
    content: React.ReactNode;
  }[];
}) => {
  return (
    <ReactTabs.Root defaultValue={tabs[0]?.value} className="space-y-4">
      <ReactTabs.List
        aria-label={label}
        className="grid grid-cols-[repeat(auto-fit,minmax(1rem,_1fr))] rounded-lg border border-zinc-800"
      >
        {tabs.map((tab) => (
          <ReactTabs.TabsTrigger
            className="p-2 transition-colors first:rounded-l-lg last:rounded-r-lg hover:bg-zinc-900 data-[state=active]:bg-zinc-800 data-[state=active]:font-semibold"
            value={tab.value}
            key={tab.value}
          >
            {tab.label}
          </ReactTabs.TabsTrigger>
        ))}
      </ReactTabs.List>
      {tabs.map((tab) => (
        <ReactTabs.TabsContent value={tab.value} key={tab.value}>
          {tab.content}
        </ReactTabs.TabsContent>
      ))}
    </ReactTabs.Root>
  );
};
