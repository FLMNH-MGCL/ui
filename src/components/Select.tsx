import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { SelectOption, SelectProps } from 'types';
import { UISelect } from './UISelect';

// I do not like the way I allow controllable forms here. I need to do more research into this
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
      ...props
    },
    ref
  ) => {
    // @ts-ignore: this will work I promise
    const errors = props.errors && props.name && props.errors[props.name];

    const [display, setDisplay] = useState<SelectOption | SelectOption[]>();
    const [selected, setSelected] = useState<string | string[]>();

    const id = Math.random().toString().substr(2, 10);

    useEffect(() => {
      // TODO: test me!
      if (multiple && props.value !== undefined && Array.isArray(props.value)) {
        const items = props.value.map((rawItem) => {
          const item = options.find((el) => el.value === rawItem);
          return item;
        });

        items.forEach((item) => {
          if (item) {
            // @ts-ignore: this will work i promise
            setDisplay(display ? [...display, item] : [item]);
            setSelected(selected ? [...selected, item.value] : [item.value]);
          }
        });
      } else if (
        multiple &&
        props.defaultValue !== undefined &&
        Array.isArray(props.defaultValue)
      ) {
        const items = props.defaultValue.map((rawItem) => {
          const item = options.find((el) => el.value === rawItem);
          return item;
        });

        items.forEach((item) => {
          if (item) {
            // @ts-ignore: this will work i promise
            setDisplay(display ? [...display, item] : [item]);
            // FIXME:
            setSelected(selected ? [...selected, item.value] : [item.value]);
          }
        });
      } else if (props.defaultValue !== undefined) {
        const item = options.find((el) => el.value === props.defaultValue);

        if (item) {
          setDisplay(item);
          setSelected(item.value);
        }
      } else if (props.value !== undefined) {
        const item = options.find((el) => el.value === props.value);

        if (item) {
          setDisplay(item);
          setSelected(item.value);
        }
      }
    }, []);

    // I don't love this solution at all, but ref is being forwarded so can't use it
    useEffect(() => {
      // console.log('changed!');
      const element = document.getElementById(id);
      if (element) {
        // console.log('found element', element);
        element.dispatchEvent(new Event('change', { bubbles: true }));
        // console.log('dispatched:', ret);
      }
    }, [selected]);

    function handleSelection(item?: SelectOption) {
      if (!item) {
        updateControlled && updateControlled(undefined);
        setSelected('');
        setDisplay(undefined);
        return;
      }

      if (multiple) {
        if (!display || !selected) {
          setDisplay([item]);
          setSelected([item.value]);
          updateControlled && updateControlled([item.value]);
        } else if (Array.isArray(display) && Array.isArray(selected)) {
          const existing = display.find(
            (el: SelectOption) => el.value === item.value
          );

          if (existing) {
            setDisplay(
              display.filter((el: SelectOption) => el.value !== item.value)
            );

            setSelected(selected.filter((el: string) => el !== item.value));
            updateControlled &&
              updateControlled(
                selected.filter((el: string) => el !== item.value)
              );
          } else {
            setDisplay([...display, item]);
            setSelected([...selected, item.value]);
            updateControlled && updateControlled([...selected, item.value]);
          }
        }
      } else {
        updateControlled && updateControlled(item.value);
        setDisplay(item);
        setSelected(item.value);
      }
    }

    function calculateSelected(item: SelectOption) {
      if (selected === undefined || !display) {
        return false;
      } else if (multiple && Array.isArray(display)) {
        if (display.some((el: SelectOption) => el.value === item.value)) {
          return true;
        }
      } else if (!multiple) {
        if (selected === item.value) {
          return true;
        }
      }

      return false;
    }

    // console.log('SELECT COMP', selected);

    function fakeChange() {
      // console.log('change:', selected);
      return selected;
    }

    return (
      <label
        className={clsx(
          className,
          fullWidth && 'flex-1',
          'block text-sm font-medium leading-5 text-gray-700 dark:text-dark-200'
        )}
      >
        {label}
        <div className="mt-1 relative">
          <select
            id={id}
            value={selected}
            className="hidden"
            onChange={props.onChange ?? fakeChange}
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
            slim={slim}
            multiple={multiple}
            searchable={searchable}
            errors={errors}
            display={display}
            onSelect={handleSelection}
            options={options}
            disabled={props.disabled}
            calculateSelected={calculateSelected}
            placeholder={props.placeholder}
          />
        </div>
      </label>
    );
  }
);
