import React from 'react';
import clsx from 'clsx';
import { BUTTONS, BUTTON_GAPS } from './constants';
import Spinner from './Spinner';

type GroupProps = {
  children: React.ReactNode;
  className?: string;
  gap?: keyof typeof BUTTON_GAPS;
};

function ButtonGroup({ children, className, gap = 'md' }: GroupProps) {
  const groupStyles = BUTTON_GAPS[gap] ?? BUTTON_GAPS.md;
  return (
    <div
      className={clsx(
        groupStyles,
        'flex flex-col-reverse sm:flex-row space-y-reverse justify-end',
        className
      )}
    >
      {children}
    </div>
  );
}

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof BUTTONS;
  fullWidth?: boolean;
  rounded?: boolean;
  loading?: boolean;
  tiny?: boolean;
};

// TODO: implement the loading distinction in this button element
export default function Button({
  className,
  variant = 'default',
  fullWidth,
  rounded,
  loading,
  ...props
}: Props) {
  const buttonStyle = BUTTONS[variant] || BUTTONS.default;

  if (loading) {
    return (
      <button
        type={props.type || 'button'}
        className={clsx(
          rounded ? 'p-2 rounded-full' : 'px-4 py-2 rounded-md',
          'shadow-sm relative inline-flex items-center border text-sm leading-5 font-medium transition ease-in-out duration-150 focus:outline-none',
          buttonStyle.base,
          props.disabled && 'cursor-default',
          props.disabled ? buttonStyle.disabled : buttonStyle.active,
          fullWidth && 'w-full text-center justify-center',
          className
        )}
        {...props}
      >
        <span className="flex items-center justify-center mx-auto">
          <Spinner size="sm" color="white" inline active={loading} />
        </span>
      </button>
    );
  } else {
    return (
      <button
        type={props.type || 'button'}
        className={clsx(
          rounded ? 'p-2 rounded-full' : 'px-4 py-2 rounded-md',
          'shadow-sm relative inline-flex items-center border text-sm leading-5 font-medium transition ease-in-out duration-150 focus:outline-none',
          buttonStyle.base,
          props.disabled && 'cursor-default',
          props.disabled ? buttonStyle.disabled : buttonStyle.active,
          fullWidth && 'w-full text-center justify-center',
          className
        )}
        {...props}
      />
    );
  }
}

Button.Group = ButtonGroup;
