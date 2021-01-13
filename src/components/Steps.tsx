import React, { useEffect, useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

type Props = {
  steps: number;
  current: number;
};

export default function Steps({ steps, current }: Props) {
  const [percent, setPercent] = useState(calculatePercent());

  function calculatePercent() {
    if (steps === 0) {
      throw new Error("Divide by Zero error in Steps Component!");
    } else {
      return Math.ceil((current / steps) * 100);
    }
  }

  useEffect(() => {
    setPercent(calculatePercent());
  }, [current]);

  return (
    <ProgressBar percent={percent}>
      {Array.from({ length: steps }, (_, key) => (
        <Step key={key}>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
            >
              {index + 1}
            </div>
          )}
        </Step>
      ))}
    </ProgressBar>
  );
}
