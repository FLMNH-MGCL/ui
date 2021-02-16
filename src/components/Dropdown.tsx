import React from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import useKeyboard from '../utils/useKeyboard';
import useToggle from '../utils/useToggle';
import OutsideClickHandler from 'react-outside-click-handler';
import CircleButton from './buttons/CircleButton';
import {
  DropdownHeaderProps,
  DropdownItemProps,
  DropdownProps,
  DropdownSectionProps,
} from 'types';

function Item({ text, onClick }: DropdownItemProps) {
  return (
    <div
      onClick={onClick}
      className="block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-dark-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-dark-700 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
    >
      {text}
    </div>
  );
}

function Section({ children }: DropdownSectionProps) {
  return (
    <React.Fragment>
      <div className="border-t border-gray-100 dark:border-dark-400"></div>
      <div className="py-1">{children}</div>
      <div className="border-t border-gray-100 dark:border-dark-400"></div>
    </React.Fragment>
  );
}

function Header({ text }: DropdownHeaderProps) {
  return (
    <div className="px-4 py-3 bg-gray-50 dark:bg-dark-700">
      <p className="text-sm leading-5 font-medium text-gray-900 dark:text-dark-200 truncate">
        {text}
      </p>
    </div>
  );
}

// Note: this is to be used as a dropdown menu of sorts, there is a separate
// Select component more suited to form usage.
export default function Dropdown({
  open = false,
  label,
  origin = 'left',
  rounded,
  labelIcon,
  labelIconPosition = 'left',
  icon,
  children,
  disabled,
}: DropdownProps) {
  const [visible, { toggle, off }] = useToggle(open);

  useKeyboard('Escape', () => {
    off();
  });

  // TODO: maybe use context to store reference to this, so children may close it
  // when clicked?

  return (
    <OutsideClickHandler onOutsideClick={off}>
      <div className="relative inline-block text-left">
        <div>
          <span className="rounded-md shadow-sm">
            {rounded ? (
              <CircleButton
                onClick={disabled ? undefined : toggle}
                icon={
                  icon ?? (
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )
                }
              />
            ) : (
              <button
                className={clsx(
                  disabled
                    ? 'bg-gray-100 dark:bg-dark-600 dark:text-dark-300 dark:border-dark-700'
                    : 'bg-white dark:bg-dark-400 text-gray-700 dark:text-dark-200 hover:text-gray-500 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800',
                  'border-gray-300 dark:border-dark-600 rounded-md px-4 py-2 inline-flex justify-center items-center w-full border dark:shadow-lg text-sm leading-5 font-medium focus:outline-none focus:border-blue-300 transition ease-in-out duration-150'
                )}
                disabled={disabled}
                onClick={toggle}
              >
                {labelIconPosition === 'left' && labelIcon && labelIcon}
                {label}
                {labelIconPosition === 'right' && labelIcon && labelIcon}
                {icon ?? (
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            )}
          </span>
        </div>

        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
              className={clsx(
                origin === 'left'
                  ? 'origin-top-left left-0'
                  : 'origin-top-right right-0',
                'absolute mt-2 w-56 rounded-md shadow-lg z-20'
              )}
            >
              <div
                className="rounded-md bg-white dark:bg-dark-600 overflow-hidden shadow-around-lg"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {/* <div className="border-t border-gray-100"></div> */}
                <div className="pb-1">{children}</div>
                {/* <div className="border-t border-gray-100"></div> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OutsideClickHandler>
  );
}

Dropdown.Item = Item;
Dropdown.Section = Section;
Dropdown.Header = Header;
