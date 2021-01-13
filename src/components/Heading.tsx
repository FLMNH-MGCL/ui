import clsx from 'clsx';
import React from 'react';
import { HEADINGS, TEXT_SIZES } from './constants';

//TODO: implement me
type Props = {
  tag?: keyof typeof HEADINGS;
  size?: keyof typeof TEXT_SIZES;
  className?: string;
  centered?: boolean;
  children: React.ReactNode;
};

export default function Heading({
  centered,
  children,
  className,
  tag = 'h3',
  size = 'md',
}: Props) {
  const headerStyles = HEADINGS[tag] ?? HEADINGS.h3;
  const headerSize = TEXT_SIZES[size] ?? TEXT_SIZES.md;
  return (
    <h3
      className={clsx(
        className,
        headerStyles,
        headerSize,
        centered && 'text-center'
      )}
    >
      {children}
    </h3>
  );
}
