import clsx from 'clsx';
import React from 'react';
import { HeadingProps } from 'types';
import { HEADINGS, TEXT_SIZES } from './constants';

//TODO: implement me

export default function Heading({
  centered,
  children,
  className,
  tag = 'h3',
  size = 'md',
}: HeadingProps) {
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
