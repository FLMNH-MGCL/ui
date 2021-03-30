import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import useToggle from '../utils/useToggle';

const POSITIONS = {
  left: 'left-0 ml-3',
  right: 'right-0 mr-3',
};

const SIZES = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

type Props = {
  origin?: keyof typeof POSITIONS;
  text: string;
  size?: keyof typeof SIZES;
};

export default function Tooltip({ origin = 'left', text, size = 'sm' }: Props) {
  const [visible, { on, off }] = useToggle(false);

  const positionStyle = POSITIONS[origin];
  const sizeStyle = SIZES[size];

  return (
    <div
      className="relative flex justify-end items-center"
      onMouseEnter={on}
      onMouseLeave={off}
    >
      {/* TRIGGER */}
      <span
        className={clsx(origin === 'right' && 'justify-end', 'flex w-full')}
      >
        <svg
          className={clsx(sizeStyle)}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>

      {/* BODY */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
            className={clsx(
              origin === 'left'
                ? size === 'sm'
                  ? 'origin-top-left left-0 -ml-2'
                  : 'origin-top-left left-0 -ml-1'
                : size === 'sm'
                ? 'origin-top-right right-0 -mr-2'
                : 'origin-top-right right-0 -mr-1',
              'bottom-0 mb-7 absolute z-10 max-w-md'
            )}
          >
            <div className="bg-gray-100 dark:bg-dark-400 dark:text-dark-200 text-xs rounded py-1 px-4 right-0 bottom-full min-w-56">
              <p className="w-full max-h-12 overflow-scroll">{text}</p>
              <svg
                className={clsx(
                  'absolute text-gray-100 dark:text-dark-400 h-2 top-full',
                  positionStyle
                )}
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
              >
                <polygon
                  className="fill-current"
                  points="0,0 127.5,127.5 255,0"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
