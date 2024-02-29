"use client";
import { Input } from "../components/input";
import { useMask } from "@react-input/mask";

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
