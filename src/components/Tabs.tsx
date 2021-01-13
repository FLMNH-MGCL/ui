import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type ActiveIndicatorProps = {
  className?: string;
  styles: any;
};

function ActiveIndicator({ className, styles }: ActiveIndicatorProps) {
  return (
    <div
      style={styles}
      className={clsx('w-full bg-indigo-600 h-0.5', className)}
    />
  );
}

type TabProps = {
  text: string;
  onClick(): void;
  fullWidth?: boolean;
  active?: boolean;
};

function Tab({ text, fullWidth, onClick, active }: TabProps) {
  return (
    <button
      className={clsx(
        fullWidth && 'flex-1',
        !active && 'border-b-2 border-transparent hover:border-gray-300',
        'space-y-1 leading-6 font-medium text-gray-900 dark:text-dark-200 hover:text-gray-700 focus:outline-none focus:text-gray-700 '
      )}
      onClick={onClick}
    >
      <p className="pb-0 p-2">{text}</p>
    </button>
  );
}

type Props = {
  tabs: string[];
  selectedIndex: number;
  fullWidth?: boolean;
  onChange(index: number): void;
};

export default function Tabs({
  tabs,
  selectedIndex,
  fullWidth,
  onChange,
}: Props) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeStyles, setActiveStyles] = useState({ width: 0, left: 0 });

  useEffect(() => {
    if (!tabsRef.current) {
      return;
    }

    const tab = tabsRef.current.children[selectedIndex] as HTMLElement;

    setActiveStyles({
      left: tab.offsetLeft,
      width: tab.offsetWidth,
    });
  }, [selectedIndex, tabsRef.current]);

  return (
    <div className="relative">
      <div className="flex space-x-4" ref={tabsRef}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            fullWidth={fullWidth}
            onClick={() => onChange(index)}
            text={tab}
            active={selectedIndex === index}
          />
        ))}
      </div>

      <ActiveIndicator
        className="absolute transition-all duration-150"
        styles={activeStyles}
      />
    </div>
  );
}
