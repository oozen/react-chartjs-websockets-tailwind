import React from "react";

interface Props {
  color: string;
  text: string;
}

export default function Badge({ color, text }: Props): JSX.Element {
  return (
    <span className="flex flex-wrap content-center justify-center mx-2">
      <div className="w-[10px] h-[10px] mt-[3px] rounded-full" style={{ backgroundColor: `${color}` }}></div>
      <div className="text-xs ml-1">{text}</div>
    </span>
  );
}
