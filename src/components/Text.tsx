import clsx from 'clsx';
import React from 'react';
import { TextProps } from 'types';
import { TEXT } from './constants';

export default function Text({
  centered,
  variant = 'subtext',
  size = 'sm',
  className,
  onClick,
  ...props
}: TextProps) {
  const textStyle = TEXT[variant] || TEXT.subtext;

  return (
    <p
      className={clsx(
        `text-${size}`,
        textStyle.base,
        centered && 'text-center',
        className
      )}
      onClick={onClick}
      {...props}
    />
  );
}
