export type PropsOf<TTag = any> = TTag extends React.ElementType
  ? React.ComponentProps<TTag>
  : never;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type MutuallyExclusive<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;
