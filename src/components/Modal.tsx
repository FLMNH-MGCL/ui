import React from 'react';
import FocusTrap from './FocusTrap';
import Portal from './Portal';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

type ContentProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
};

function ModalContent({ title, children }: ContentProps) {
  return (
    <div className="bg-white  dark:bg-dark-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-t-md">
      <div className="mt-3 sm:mt-0">
        {typeof title === 'string' ? (
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-200">
            {title}
          </h3>
        ) : (
          title
        )}

        <div className="mt-2 whitespace-normal">{children}</div>
      </div>
    </div>
  );
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-dark-600 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sticky rounded-b-md">
      {children}
    </div>
  );
}

const SIZES = {
  tiny: 'max-w-lg',
  small: 'max-w-xl',
  medium: 'max-w-2xl',
  large: 'max-w-3xl',
  almostMassive: 'max-w-4xl',
  massive: '',
};

type ModalProps = {
  open: boolean;
  size?: keyof typeof SIZES;
  onClose(): void;
  children: React.ReactNode;
};

// TODO: use media queries
export default function Modal({
  open,
  size = 'small',
  onClose,
  children,
}: ModalProps) {
  const modalSize = SIZES[size];

  const modalInitial = {
    opacity: 0,
    scale: 0.95,
  };

  const modalIn = {
    opacity: 1,
    scale: 1,
  };

  // TODO: don't really need this for this application
  // useEffect(() => {
  //   // we do not want external scrolling on modals,
  //   // only internal modal scrolling
  //   if (open) {
  //     noScroll.on();
  //   }

  //   // on unmount, toggle scrolling to be
  //   // enabled again
  //   return () => {
  //     noScroll.off();
  //   };
  // }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <Portal>
          <FocusTrap>
            <div className="z-30 overflow-auto fixed bottom-0 items-center inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="fixed inset-0 transition-opacity"
                onClick={onClose}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </motion.div>

              <motion.div
                initial={modalInitial}
                animate={modalIn}
                exit={modalInitial}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={clsx(
                  modalSize,
                  'relative shadow-xl w-full z-30 max-h-full'
                )}
              >
                {children}
              </motion.div>
            </div>
          </FocusTrap>
        </Portal>
      )}
    </AnimatePresence>
  );
}

Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
