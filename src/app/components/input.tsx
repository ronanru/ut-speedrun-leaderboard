"use client";
import { useId, type ComponentProps, forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  {
    label: string;
  } & ComponentProps<"input">
>(({ label, ...props }, ref) => {
  const id = useId();
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className="block w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2"
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";
