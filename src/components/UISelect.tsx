import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { SelectOption } from 'types';
import { defined } from '../utils/util';
import useKeyboard from '../utils/useKeyboard';
import useToggle from '../utils/useToggle';
import FocusTrap from './FocusTrap';

type SelectItemProps = {
  label: string;
  selectedOptions: SelectOption[];
  onSelect(): void;
};

function SelectItem({ label, selectedOptions, onSelect }: SelectItemProps) {
  function calculateSelected() {
    let isPresent = selectedOptions.find((el) => el.label === label);

    return isPresent ? true : false;
  }

  const isSelected = calculateSelected();

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
            isSelected ? 'bg-green-400' : 'bg-gray-200',
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
  errors: any;
  options: SelectOption[];
  disabled?: boolean;
  selected: string | readonly string[] | number | undefined;
  onSelectOption(item?: SelectOption): void;
  placeholder?: string;
};

export default function UISelect({
  slim,
  multiple,
  searchable,
  errors,
  disabled,
  options,
  placeholder,
  selected,
  onSelectOption,
}: UISelectProps) {
  const [visible, { toggle, off }] = useToggle(false);
  const [filter, setFilter] = useState('');

  useKeyboard('Escape', () => {
    off();
  });

  const selectedOptions = options.filter((el) => {
    if (Array.isArray(selected)) {
      return selected.includes(el.value);
    } else {
      return selected === el.value;
    }
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
            label={option.label}
            selectedOptions={selectedOptions}
            onSelect={() => {
              onSelectOption(option);

              if (!multiple) {
                off();
              }
            }}
          />
        );
      });
    }
  }

  function truncateLabelDisplay(values: readonly string[]) {
    let labels = options
      .filter((el) => values.includes(el.value))
      .map((item) => item.label);

    let ret = labels.join(', ');

    return ret.length > 25 ? ret.substring(0, 25) + '...' : ret;
  }

  function renderLabelDisplay() {
    if (Array.isArray(selected)) {
      return selected.length ? (
        <p className="dark:text-dark-200">{truncateLabelDisplay(selected)}</p>
      ) : (
        <p className="text-gray-400 dark:text-dark-300">
          {placeholder ?? 'Select'}
        </p>
      );
    } else if (defined(selected)) {
      let item = options.find((el) => el.value === selected);

      // this should not happen in a select component:
      // ... but it does when asyn loading options...
      // FIXME
      if (!item) {
        // throw new Error(
        //   'Attempted to select entry which does not exist in Select component'
        // );
        return (
          <p className="text-gray-400 dark:text-dark-200">
            {placeholder ?? 'Select'}
          </p>
        );
      } else {
        return <p className="dark:text-dark-200">{item.label}</p>;
      }
    } else {
      return (
        <p className="text-gray-400 dark:text-dark-300">
          {placeholder ?? 'Select'}
        </p>
      );
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
            <div className="flex items-center space-x-3 mr-3">
              {renderLabelDisplay()}
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              {!!selectedOptions.length && (
                <svg
                  onClick={() => onSelectOption(undefined)}
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
            <FocusTrap>
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
                      className="bg-gray-50 dark:bg-dark-500 text-gray-900 dark:text-dark-200 cursor-pointer select-none relative py-2  hover:bg-gray-50 dark:hover:bg-dark-700 border-b border-gray-100 dark:border-dark-400"
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
            </FocusTrap>
          )}
        </AnimatePresence>
      </div>
      {errors && (
        <p className="mt-2 text-sm text-red-600">* {errors.message}</p>
      )}
    </OutsideClickHandler>
  );
}
