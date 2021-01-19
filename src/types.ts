import {
  BUTTONS,
  BUTTON_GAPS,
  HEADINGS,
  MODAL_SIZES,
  SPINNER_SIZES,
  TEXT,
  TEXT_SIZES,
} from 'components/constants';
import Form from 'components/Form';
import { INPUT_ICONS } from 'components/Input';
import { DeepPartial, SubmitHandler, UnpackNestedValue } from 'react-hook-form';
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

type ChildProps = {
  children: React.ReactText;
};

type StringProps = {
  codeString: string;
};

export type CodeProps = MutuallyExclusive<ChildProps, StringProps> & {
  rounded?: boolean;
  slim?: boolean;
  language?: string;
  theme?: 'light' | 'dark';
  maxHeight?: string;
};

export type DateRange = { from?: Date; to?: Date };

export type RangedPickerProps = Omit<SinglePickerProps, 'initalDate'> & {
  initialDate?: DateRange;
};

export type SinglePickerProps = {
  label?: string;
  name?: string;
  futureOnly?: boolean;
  pastOnly?: boolean;
  ranged?: boolean;
  fullWidth?: boolean;
  initialDate?: string | Date;
  placeholder?: string;
} & PropsOf<typeof Form.Input>;

export type DatepickerProps = SinglePickerProps | RangedPickerProps;

export type DividerProps = {
  text?: string;
};

export type DropdownItemProps = {
  text: string;
  onClick?(): void;
};

export type DropdownSectionProps = { children: React.ReactNode };

export type DropdownHeaderProps = {
  text: string;
};

export type DropdownProps = {
  open?: boolean;
  label?: string;
  origin?: 'left' | 'right';
  labelIconPosition?: 'left' | 'right';
  rounded?: boolean;
  labelIcon?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export type FormGroupProps = {
  children: React.ReactNode;
  flex?: boolean;
  hidden?: boolean;
};

export type FormProps<T> = {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  disabled?: boolean;
  defaultValues?: UnpackNestedValue<DeepPartial<T>>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export type HeadingProps = {
  tag?: keyof typeof HEADINGS;
  size?: keyof typeof TEXT_SIZES;
  className?: string;
  centered?: boolean;
  children: React.ReactNode;
};

export type LabelProps = {
  fullWidth?: boolean;
} & React.ComponentProps<'label'>;

export type ModalContentProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
};

export type ModalFooterProps = { children: React.ReactNode };

export type ModalProps = {
  open: boolean;
  size?: keyof typeof MODAL_SIZES;
  onClose(): void;
  children: React.ReactNode;
};

export type NotificationProps = {
  title: string;
  message: string;
  level: 'error' | 'success' | 'warning' | 'info';
};

export type PortalProps = { children: React.ReactNode };

export type RadioProps = {
  checked?: boolean;
  label?: string;
  stacked?: boolean;
} & React.ComponentProps<'input'>;

export type SpinnerProps = {
  active?: boolean;
  size?: keyof typeof SPINNER_SIZES;
  inline?: boolean;
  color?: 'gray' | 'white';
};

export type StatisticProps = {
  value?: number;
  percent?: boolean;
  unit: string;
};

export type StepsProps = {
  steps: number;
  current: number;
};

export type SwitchProps = {
  enabled: boolean;
  onToggle(): void;
};

export type TabProps = {
  text: string;
  onClick(): void;
  fullWidth?: boolean;
  active?: boolean;
};

export type TextProps = {
  variant?: keyof typeof TEXT;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  onClick?(): void;
} & PropsOf<'p'>;
