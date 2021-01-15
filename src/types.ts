import { BUTTONS, BUTTON_GAPS } from 'components/constants';
import { INPUT_ICONS } from 'components/Input';
import { TableProps as VTableProps } from 'react-virtualized';

export type PropsOf<TTag = any> = TTag extends React.ElementType
  ? React.ComponentProps<TTag>
  : never;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type MutuallyExclusive<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type FormSubmitValues = Record<string, any>;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof BUTTONS;
  fullWidth?: boolean;
  rounded?: boolean;
  loading?: boolean;
  tiny?: boolean;
};

export type ButtonGroupProps = {
  children: React.ReactNode;
  className?: string;
  gap?: keyof typeof BUTTON_GAPS;
};

export type InputProps = {
  label?: string;
  fullWidth?: boolean;
  slim?: boolean;
  icon?: keyof typeof INPUT_ICONS;
  iconClick?(): void;
} & React.ComponentProps<'input'>;

export type FocusTrapProps = {
  /** Content to wrap. */
  children: NonNullable<React.ReactNode>;
  /** Disable automatic focusing. */
  disabled?: boolean;
};

export type SelectOption = {
  label: string;
  value: any;
  inputType?: string | null;
};

export type SelectBadgeProps = {
  label: string;
  onDelete(): void;
};

export type UISelectProps = {
  slim?: boolean;
  multiple?: boolean;
  errors: any; // TODO: type me
  display: SelectOption | SelectOption[] | undefined;
  options: SelectOption[];
  disabled?: boolean;
  onSelect(item?: SelectOption): void;
  calculateSelected(item: SelectOption): boolean;
  placeholder?: string;
};

export type SelectProps = {
  slim?: boolean;
  label?: string;
  fullWidth?: boolean;
  options: SelectOption[];
  updateControlled?(newVal: any): void;
} & React.ComponentProps<'select'>;

export type SortingConfig = {
  direction: 'asc' | 'desc';
  column: string;
};

export type TableProps = Omit<VTableProps, 'width' | 'height'> & {
  basic?: boolean;
  data: Object[];
  activeIndex?: number;
  headers: string[];
  loading?: boolean;
  sortable?: boolean;
  containerClassname?: string;
};

export type TextAreaProps = {
  label?: string;
  fullWidth?: boolean;
} & React.ComponentProps<'textarea'>;
