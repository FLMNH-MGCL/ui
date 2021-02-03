import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { SelectBadgeProps, SelectOption } from 'types';
import useKeyboard from '../utils/useKeyboard';
import useToggle from '../utils/useToggle';

function SelectedBadge({ label, onDelete }: SelectBadgeProps) {
  return (
    <span className="flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800 hover:bg-gray-200 space-x-2 max-w-1/2 truncate">
      <p>{label}</p>

      <svg
        onClick={onDelete}
        className="w-3 h-3 cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </span>
  );
}

type SelectItemProps = {
  label: string;
  selected: boolean;
  onSelect(): void;
};

function SelectItem({ label, selected, onSelect }: SelectItemProps) {
  return (
    <li
      id="listbox-item-0"
      role="option"
      className="bg-white dark:bg-dark-500 text-gray-900 dark:text-dark-200 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 dark:hover:bg-dark-700"
      onClick={onSelect}
    >
      <div className="flex items-center space-x-3">
        <span
          aria-label="Online"
          className={clsx(
            selected ? 'bg-green-400' : 'bg-gray-200',
            'flex-shrink-0 inline-block h-2 w-2 rounded-full'
          )}
        />
        <span className="font-normal block truncate">{label}</span>
      </div>
    </li>
  );
}

type UISelectProps = {
  slim?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  errors: any; // TODO: type me
  display: SelectOption | SelectOption[] | undefined;
  options: SelectOption[];
  disabled?: boolean;
  onSelect(item?: SelectOption): void;
  calculateSelected(item: SelectOption): boolean;
  placeholder?: string;
};

export function UISelect({
  slim,
  multiple,
  display,
  searchable,
  options,
  onSelect,
  calculateSelected,
  disabled,
  errors,
  placeholder,
}: UISelectProps) {
  const [visible, { toggle, off }] = useToggle(false);

  const [filter, setFilter] = useState('');

  useKeyboard('Escape', () => {
    off();
  });

  function renderOptions() {
    const filteredOptions = options.filter((option) => {
      if (!filter) {
        return true;
      }

      return String(option.value).toLowerCase().includes(filter.toLowerCase());
    });

    if (!filteredOptions || !filteredOptions.length) {
      return (
        <div className="bg-white dark:bg-dark-500 text-gray-900 dark:text-dark-200 cursor-pointer select-none relative py-2 px-3">
          No matching options
        </div>
      );
    } else {
      return filteredOptions.map((option) => {
        return (
          <SelectItem
            key={option.label}
            selected={calculateSelected(option)}
            label={option.label}
            onSelect={() => {
              onSelect(option);

              if (!multiple) {
                off();
              }
            }}
          />
        );
      });
    }
  }

  return (
    <OutsideClickHandler onOutsideClick={off}>
      <div className="relative">
        <span className="inline-block w-full rounded-md shadow-sm">
          <button
            type="button"
            onClick={disabled ? undefined : toggle}
            className={clsx(
              slim ? 'py-1' : 'py-2',
              errors &&
                'border border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red',
              errors ??
                'border  border-gray-300 dark:border-dark-400 placeholder-gray-400 dark:placeholder-dark-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300',
              'appearance-none block w-full text-left pl-3 pr-10 px-3 rounded-md transition duration-150 ease-in-out text-sm leading-5',
              disabled
                ? 'bg-gray-100 dark:bg-dark-500'
                : 'bg-white dark:bg-dark-400'
            )}
          >
            <div className="flex items-center space-x-3">
              {Array.isArray(display) ? (
                display.length > 0 ? (
                  <React.Fragment>
                    {display.slice(0, 3).map((item: SelectOption) => {
                      return (
                        <SelectedBadge
                          key={`badge-${item.value}`}
                          onDelete={() => onSelect(item)}
                          label={item.label}
                        />
                      );
                    })}
                  </React.Fragment>
                ) : (
                  <p className="text-gray-400 dark:text-dark-300">
                    {placeholder ?? 'Select'}
                  </p>
                )
              ) : display ? (
                <p className="dark:text-dark-200">{display.label}</p>
              ) : (
                <p className="text-gray-400 dark:text-dark-300">
                  {placeholder ?? 'Select'}
                </p>
              )}
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              {display && (
                <svg
                  onClick={() => onSelect(undefined)}
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <svg
                className="h-5 w-5 text-gray-400 pointer-events-none"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </span>

        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
              className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-50"
            >
              <ul className="bg-white dark:bg-dark-400 max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                {searchable && (
                  <li
                    id="listbox-item-0"
                    className="bg-white dark:bg-dark-500 text-gray-900 dark:text-dark-200 cursor-pointer select-none relative py-2  hover:bg-gray-50 dark:hover:bg-dark-700 border-b border-gray-100 dark:border-dark-400"
                  >
                    <input
                      className="pl-3 bg-transparent w-full "
                      value={filter}
                      onChange={(e) => setFilter(e.currentTarget.value)}
                      placeholder="Filter Options"
                    />
                  </li>
                )}
                {renderOptions()}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {errors && (
        <p className="mt-2 text-sm text-red-600">* {errors.message}</p>
      )}
    </OutsideClickHandler>
  );
}
