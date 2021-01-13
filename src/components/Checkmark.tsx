import React from "react";

/* https://github.com/stanleyxu2005/react-checkmark */

/* NOTE: I have copied this from the library due to an annoying 
bug in the source code. I will reuse the library 
once this is resolved, but for now I will be using the local, TypeScript 
definition of the component */

export const namedSizes = {
  small: 16,
  medium: 24,
  large: 52,
  xLarge: 72,
  xxLarge: 96,
};

interface CheckmarkProps {
  size?: keyof typeof namedSizes;
  color?: string;
}

export default function Checkmark({ size = "large", color }: CheckmarkProps) {
  const actualSize = namedSizes[size] ?? size;

  let style = { width: actualSize, height: actualSize } as any;
  if (color) {
    style["--checkmark-fill-color"] = color;
  }

  return (
    <svg
      className="checkmark"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      viewBox="0 0 52 52"
    >
      <circle
        className="checkmark__circle"
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className="checkmark__check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  );
}
