"use client";
import { useMask } from "@react-input/mask";
import { Input } from "../components/input";

export const TimeInput = () => {
  const inputRef = useMask({
    mask: "__m __s ___ms",
    replacement: {
      _: /\d/,
    },
    showMask: true,
  });
  return <Input label="Your Time" name="time" ref={inputRef} />;
};
