import clsx from 'clsx';
import React from 'react';

type LabelProps = {
  fullWidth?: boolean;
} & React.ComponentProps<'label'>;

export default function Label({ className, fullWidth, ...props }: LabelProps) {
  return (
    <label
      className={clsx(
        className,
        fullWidth && 'flex-1',
        'block text-sm font-medium leading-5 text-gray-700 dark:text-dark-300'
      )}
      {...props}
    />
  );
}
