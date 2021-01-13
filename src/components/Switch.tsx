import clsx from 'clsx';
import React from 'react';

type Props = {
  enabled: boolean;
  onToggle(): void;
};

export default function Switch({ enabled, onToggle }: Props) {
  return (
    <span
      role="checkbox"
      aria-checked="false"
      className="group relative inline-flex items-center justify-center flex-shrink-0 h-5 w-10 cursor-pointer focus:outline-none"
      onClick={onToggle}
    >
      <span
        aria-hidden="true"
        className={clsx(
          enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-dark-300',
          'absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'
        )}
      ></span>
      <span
        aria-hidden="true"
        className={clsx(
          'absolute left-0 inline-block h-5 w-5 border border-gray-200 dark:border-dark-500 rounded-full bg-white dark:bg-dark-400 shadow transform group-focus:shadow-outline group-focus:border-blue-300 transition-transform ease-in-out duration-200',
          !enabled && 'translate-x-0',
          enabled && 'translate-x-5'
        )}
      ></span>
    </span>
  );
}
