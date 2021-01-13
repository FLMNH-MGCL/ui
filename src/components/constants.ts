export enum COLORS {
  BLUE = '#639CFF', // Cornflower Blue
  DARK_BLUE = '#2B4570', // Dark Cornflower Blue
  MUSEUM_GREEN = '#008A83', // Dark Cyan
  WARNING = '#E0CA3C', // Citrine
  DANGER = '#c20114', // Venetian Red
}

export const TEXT = {
  label: {
    base: 'text-sm font-medium leading-5 text-gray-700 dark:text-dark-200',
    error: 'text-sm font-medium leading-5 text-red-700',
  },
  subtext: {
    base: 'dark:text-dark-200',
    error: '',
  },
};

export const NOTIFICATION_COLORS = {
  error: {
    title: 'text-red-800',
    text: 'text-red-500',
  },
  success: {
    title: 'text-green-800',
    text: 'text-green-500',
  },
  warning: {
    title: 'text-yellow-800',
    text: 'text-yellow-400',
  },
  info: {
    title: 'text-blue-800',
    text: 'text-blue-500',
  },
};

export const SPINNER_SIZES = {
  tiny: 'h-3 w-3',
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-24 w-24',
  massive: 'h-48 w-48',
};

export const TEXT_SIZES = {
  tiny: 'text-xs',
  xs: 'text-sm',
  sm: 'text-md',
  md: 'text-lg',
  lg: '',
  xl: '',
  massive: 'text-5xl',
};

export const HEADINGS = {
  h1:
    'font-extrabold text-gray-900 dark:text-dark-200 leading-none tracking-tight',
  h2: 'font-bold text-gray-900 dark:text-dark-200 leading-none tracking-tight',
  h3: 'leading-6 font-medium text-gray-900 dark:text-dark-200',
  h4: '',
  h5: '',
};

// TODO: make theme more aligned with museum
export const BUTTONS = {
  primary: {
    base: 'border-transparent text-white focus:outline-none',
    active:
      'bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700',
    disabled: 'bg-indigo-400',
  },
  primaryBlue: {
    base: 'border-transparent text-white focus:outline-none',
    active:
      'bg-blue-600 hover:bg-blue-500 focus:shadow-outline-blue focus:border-blue-700 active:bg-blue-700',
    disabled: 'bg-blue-400',
  },
  default: {
    base: 'border-gray-300 dark:border-dark-600',
    active:
      'dark:bg-dark-400 dark:text-dark-200 bg-white text-gray-700 hover:text-gray-500 focus:border-blue-300 focus:shadow-outline',
    disabled:
      'bg-gray-100 dark:bg-dark-600 dark:text-dark-300 dark:border-dark-700',
  },
  danger: {
    base: 'border-transparent text-white',
    active:
      'bg-red-600 hover:bg-red-500 focus:border-red-700 focus:shadow-outline-red',
    disabled: 'bg-red-400',
  },
  warning: {
    base: 'border-transparent text-white',
    active:
      'bg-yellow-400 hover:bg-yellow-300 focus:border-yellow-400 focus:shadow-outline-yellow',
    disabled: 'bg-yellow-300',
  },
  clear: {
    base: 'border-gray-300',
    active:
      'text-gray-700 hover:text-gray-500 focus:border-blue-300 focus:shadow-outline',
    disabled: 'bg-gray-100',
  },
  outline: {
    base: 'bg-white dark:bg-dark-400 border-gray-300 dark:border-dark-600',
    active:
      'bg-white dark:bg-dark-400 text-gray-700 dark:text-dark-200 dark:border-dark-600 hover:text-gray-500 focus:border-blue-300 focus:shadow-outline shadow',
    disabled:
      'bg-gray-100 dark:bg-dark-600 dark:text-dark-300 dark:border-dark-700',
  },
  danger_outline: {
    base: 'border-red-300',
    active:
      'text-red-700 hover:text-red-500 focus:border-red-300 focus:shadow-outline shadow',
    disabled: 'bg-gray-100',
  },
  activated: {
    base: 'bg-white border-green-300',
    active:
      'bg-white text-green-700 hover:text-green-500 focus:border-blue-300 focus:shadow-outline shadow',
    disabled: 'bg-gray-100',
  },
};

export const BADGE_COLORS = {
  gray: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  red: 'bg-red-100 text-red-800 hover:bg-red-200',
};

export const BUTTON_GAPS = {
  sm: 'space-y-2 sm:space-y-0 sm:space-x-2',
  md: 'space-y-3 sm:space-y-0 sm:space-x-3',
  lg: 'space-y-6 sm:space-y-0 sm:space-x-6',
};

export const TABLE_CLASSES = {
  headerRow:
    'px-6 py-3 bg-gray-50 dark:bg-dark-600 text-left text-xs leading-4 font-medium text-gray-600  dark:text-dark-200 tracking-wider cursor-pointer focus:outline-none',
  row:
    'dark:bg-dark-500 dark:text-dark-200 border-gray-200 dark:border-dark-400',
  grid: 'whitespace-no-wrap text-sm leading-5 font-medium text-gray-900',
  footer:
    'bg-gray-50 dark:bg-dark-600 px-4 py-3 flex items-center justify-between sm:px-6 border-t border-cool-gray-100  dark:border-dark-400',
  footerFixed:
    'h-16 bg-gray-50 dark:bg-dark-600 flex items-center justify-between px-4',
};
