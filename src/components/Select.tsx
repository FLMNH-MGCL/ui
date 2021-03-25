import clsx from 'clsx';
import React, { forwardRef, useState } from 'react';
import { SelectOption, SelectProps } from 'types';
import { defined } from '../utils/util';
import UISelect from './UISelect';

export default forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      slim,
      label,
      className,
      searchable,
      fullWidth,
      multiple,
      options,
      updateControlled,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const id = Math.random().toString().substr(2, 10);

    // TODO: add focused state to UISelect to render the ring

    // I am manually checking for undefineds here because entering a value
    // of 0 would fail these ! checks
    function initSelection() {
      // no change really, should be undefined
      if (!defined(props.value) && !defined(defaultValue)) {
        return multiple ? [] : undefined;
      }

      let startingValue;

      // value always takes precedence*
      if (defined(props.value)) {
        if (multiple && !Array.isArray(props.value)) {
          startingValue = [props.value as string];
        } else {
          startingValue = props.value;
        }
      } else {
        // I checked if both were not defined above, so at this point if props.value
        // wasn't defined then defaultValue is
        if (multiple && !Array.isArray(defaultValue)) {
          // I am casting to string because the type checker thought I was trying to
          // create a readonly string[][] here.
          startingValue = [defaultValue as string];
        } else {
          startingValue = defaultValue;
        }
      }

      return startingValue;
    }

    function handleSelectUIOption(item?: SelectOption) {
      if (!item) {
        // clear button was selected
        setSelected(multiple ? [] : undefined);
        updateControlled && updateControlled(multiple ? [] : undefined);
      } else if (multiple && Array.isArray(selected)) {
        let alreadySelected = selected?.includes(item.value);

        if (alreadySelected) {
          let updated = selected.filter((el) => el !== item.value);
          setSelected(updated);
          updateControlled && updateControlled(updated);
        } else {
          let updated = [...selected, item.value];
          setSelected(updated);
          updateControlled && updateControlled(updated);
        }
      } else if (selected === item.value) {
        setSelected(undefined);
        updateControlled && updateControlled(undefined);
      } else {
        setSelected(item.value);
        updateControlled && updateControlled(item.value);
      }
    }

    const [selected, setSelected] = useState(initSelection());

    // @ts-ignore: this will work I promise
    const errors = props.errors && props.name && props.errors[props.name];

    const onChange = function (e: React.ChangeEvent<HTMLSelectElement>) {
      setSelected(e.target.value);
      updateControlled && updateControlled(e.target.value);
    };

    return (
      <label
        className={clsx(
          className,
          fullWidth && 'flex-1',
          'block text-sm font-medium leading-5 text-gray-700 dark:text-dark-200'
        )}
      >
        {label}
        <div className={clsx(label && 'mt-1', 'relative')}>
          <select
            id={id}
            value={selected}
            className="hidden"
            onChange={onChange}
            multiple={multiple}
            ref={ref}
            {...props}
          >
            {/* TODO: I don't love this solution */}
            <option value=""></option>
            {options.map((item: SelectOption) => (
              <option key={`raw-option-${item.value}`} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <UISelect
            selected={selected}
            slim={slim}
            disabled={props.disabled}
            searchable={searchable}
            errors={errors}
            options={options}
            multiple={multiple}
            placeholder={props.placeholder}
            onSelectOption={handleSelectUIOption}
          />
        </div>
      </label>
    );
  }
);
