import clsx from 'clsx';
import React from 'react';
import { PropsOf } from 'types';
import { TEXT } from './constants';

type Props = {
  variant?: keyof typeof TEXT;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  onClick?(): void;
} & PropsOf<'p'>;

export default function Text({
  centered,
  variant = 'subtext',
  size = 'sm',
  className,
  onClick,
  ...props
}: Props) {
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
