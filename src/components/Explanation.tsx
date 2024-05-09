import React from "react";

interface Props {
  data?: any;
}

export default function Explanation({ data }: Props): JSX.Element {
  return (
    <div className="absolute bottom-5">
      <h4>What does it mean?</h4>
      <p className="text-xs text-mid-gray">
        Lorem ipsum dolor sit amet consectetur. Lectus cursus lacus rhoncus proin vulputate diam sollicitudin nisl. Vulputate dignissim feugiat neque diam elementum quam in justo.
      </p>
    </div>
  );
}
