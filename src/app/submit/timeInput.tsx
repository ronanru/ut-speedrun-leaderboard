"use client";
import { Input } from "../components/input";
import { useMask } from "@react-input/mask";

export const TimeInput = () => {
  const inputRef = useMask({
    mask: "00m 00s 000ms",
    replacement: {
      "0": /\d/,
    },
    showMask: true,
  });
  return <Input label="Your Time" name="time" ref={inputRef} />;
};
