import clsx from 'clsx';
import React from 'react';
import { SPINNER_SIZES } from './constants';

type Props = {
  active?: boolean;
  size?: keyof typeof SPINNER_SIZES;
  inline?: boolean;
  color?: 'gray' | 'white';
};

export default function Spinner({
  inline,
  active,
  size = 'md',
  color = 'gray',
}: Props) {
  const SIZE = SPINNER_SIZES[size] ?? SPINNER_SIZES.md;

  if (!active) return null;

  return (
    <div
      className={clsx(
        inline ? 'mx-auto' : 'absolute bottom-0 inset-0',
        'flex items-center justify-center pointer-events-none'
      )}
    >
      <svg
        className={clsx(
          color === 'gray' ? ' text-gray-600' : 'text-white',
          'animate-spin',
          SIZE
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}
