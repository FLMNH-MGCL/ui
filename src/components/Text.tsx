import clsx from 'clsx';
import React from 'react';
import { TEXT } from './constants';

type Props = {
  variant?: keyof typeof TEXT;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactText;
  className?: string;
  centered?: boolean;
  onClick?(): void;
};

export default function Text({
  centered,
  children,
  variant = 'subtext',
  size = 'sm',
  className,
  onClick,
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
    >
      {children}
    </p>
  );
}
