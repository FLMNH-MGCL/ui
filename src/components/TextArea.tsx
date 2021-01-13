import React from 'react';
import clsx from 'clsx';
import { forwardRef } from 'react';

export type Props = {
  label?: string;
  fullWidth?: boolean;
} & React.ComponentProps<'textarea'>;

export default forwardRef<HTMLTextAreaElement, Props>(
  ({ label, className, fullWidth, ...props }, ref) => {
    // @ts-ignore: this will work I promise
    const errors = props.errors && props.name && props.errors[props.name];

    // console.log(errors);

    return (
      <label
        className={clsx(
          className,
          fullWidth && 'flex-1',
          'block text-sm font-medium leading-5 text-gray-700 dark:text-dark-200'
        )}
      >
        {label}
        <div className="mt-1 relative">
          <textarea
            className={clsx(
              'py-2',
              errors &&
                'border border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red',
              errors ??
                'border border-gray-300 dark:border-dark-400 placeholder-gray-400 dark:placeholder-dark-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300',
              'appearance-none block w-full px-3 rounded-md transition duration-150 ease-in-out text-sm leading-5 dark:text-dark-200',
              props.disabled
                ? 'bg-gray-100 dark:bg-dark-500'
                : 'dark:bg-dark-400'
            )}
            ref={ref}
            {...props}
          />
        </div>
        {errors && (
          <p className="mt-2 text-sm text-red-600">* {errors.message}</p>
        )}
      </label>
    );
  }
);
