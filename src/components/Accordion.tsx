import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { AccordionItemProps, AccordionProps } from 'types';
import Heading from './Heading';
import Text from './Text';

function AccordionItem({ open, title, content, onClick }: AccordionItemProps) {
  return (
    <div className="rounded-md py-2 px-4 bg-gray-50 dark:bg-dark-500 flex flex-col space-y-4">
      <div
        onClick={onClick}
        className="flex justify-between items-center cursor-pointer"
      >
        <Heading size="sm">{title}</Heading>
        {open ? (
          <svg
            className="h-4 w-4 text-gray-500 dark:text-dark-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        ) : (
          <svg
            className="h-4 w-4 text-gray-500 dark:text-dark-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.1 }}
            className="cursor-text"
          >
            {Array.isArray(content) ? (
              content.map((text, i) => <Text key={i}>{text}</Text>)
            ) : typeof content === 'string' ? (
              <Text>{content}</Text>
            ) : (
              content
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number>();

  function toggle(index: number) {
    if (activeIndex === index) {
      setActiveIndex(undefined);
    } else {
      setActiveIndex(index);
    }
  }

  return (
    <div className="rounded-md w-full bg-gray-50 dark:bg-dark-600 p-2 flex flex-col space-y-2">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          open={activeIndex === index}
          onClick={() => toggle(index)}
          {...item}
        />
      ))}
    </div>
  );
}
