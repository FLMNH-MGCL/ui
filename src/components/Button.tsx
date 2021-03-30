import React from 'react';
import clsx from 'clsx';
import { BUTTONS, BUTTON_GAPS } from './constants';
import Spinner from './Spinner';
import { ButtonGroupProps, ButtonProps } from 'types';

function ButtonGroup({ children, className, gap = 'md' }: ButtonGroupProps) {
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

// TODO: implement the loading distinction in this button element
export default function Button({
  className,
  variant = 'default',
  fullWidth,
  rounded,
  loading,
  ...props
}: ButtonProps) {
  const buttonStyle = BUTTONS[variant] || BUTTONS.default;

  if (loading) {
    return (
      <button
        type={props.type || 'button'}
        className={clsx(
          rounded ? 'p-2 rounded-full' : 'px-4 py-2 rounded-md',
          'shadow-sm relative inline-flex items-center border text-sm leading-5 font-medium transition ease-in-out duration-150 focus:outline-none',
          buttonStyle.base,
          props.disabled && 'cursor-not-allowed',
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
