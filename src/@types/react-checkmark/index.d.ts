type sizes = 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge';

interface CheckmarkProps {
  size?: number | sizes;
  color?: string;
}

declare module 'react-checkmark' {
  import * as React from 'react';

  export class Checkmark extends React.PureComponent<CheckmarkProps, any> {}
}
