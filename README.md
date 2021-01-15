# ui

This repository holds the UI component library used in [SpeSQL](https://github.com/FLMNH-MGCL/spesql), developed using React (TypeScript) and Tailwind CSS.

- [Installation](#installation)
- [Tailwind Configuration](#tailwind-config)
- [Contributing](#contributing)
- [Available Components](#components-available)

## Installation

You can install this library using either `npm` or `yarn`

```bash
yarn add @flmnh-mgcl/ui
npm install @flmnh-mgcl/ui
```

## Tailwind Config

I have not included any of the Tailwind configuration in this library, as such in order to use it you must ensure your project is properly configured separately. Here is the config I use in my projects that allow the components render properly:

```js
const defaultTheme = require('tailwindcss/defaultTheme');
const uicolors = require('@tailwindcss/ui/colors');

module.exports = {
  darkMode: 'class',
  variants: {
    extend: {
      margin: ['first'],
      padding: ['first'],
    },
  },
  theme: {
    colors: {
      ...uicolors,
      dark: {
        900: 'rgb(25,25,25)',
        800: 'rgb(36,36,36)',
        700: 'rgb(40,40,40)',
        600: '#2D2D2D',
        500: 'rgb(50,50,50)',
        400: '#3d3d3d',
        300: '#b2b2b2',
        200: 'rgb(223,223,223)',
        twilight: 'rgb(30, 30, 30)',
        stacking: 'rgba(25,25,25,0.2)',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      minHeight: {
        0: 0,
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
        68: '17rem',
        72: '18rem',
        76: '19rem',
        80: '20rem',
        84: '21rem',
        88: '22rem',
        92: '23rem',
        '5/6': '83vh',
      },
      minWidth: {
        0: 0,
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

In a future release I may consider packaging this up better so you do not need to account for this

## Contributing

Feel free to contribute and make this project better! There are definitely areas that can be improved overall, I feel!

If you want to contribute, try to tackle any **existing issues on GitHub first** before attempting any other contributions.

## Components Available

_This project is still under active development, components will be added / altered throughout the duration of the project. These are the currently available components:_

- [Badge](#badge)
- [Button](#button)
- [Button.Group](#buttongroup)
- [Checkmark](#checkmark)
- [Code](#code)
- [Datepicker](#datepicker)
- [Divider](#divider)
- [Dropdown](#dropdown)
- [FocusTrap](#focustrap)
- [Form](#form)
- [Heading](#heading)
- [Input](#input)
- [Label](#label)
- [Modal](#modal)
- [Notification](#notification)
- [Portal](#portal)
- [Radio](#radio)
- [Select](#select)
- [Spinner](#spinner)
- [Statistic](#statistic)
- [Steps](#steps)
- [Switch](#switch)
- [Table](#table)
- [Tabs](#tabs)
- [Text](#text)
- [TextArea](#textarea)

_Note: Most components are based off of their counterparts in the Tailwind UI components. While they do not use Tailwind UI components, the styling itself is largely inspired from here._

### Badge

The Badge component is based off of Tailwind UIs [badge](https://tailwindui.com/components/application-ui/elements/badges) component.

#### Available Props

The Badge component props has a mutually exclusive option of passing either a label OR a child(ren) ReactNode, as well as an onClick handler and a color selector. You may not pass in a child ReactNode if you pass a label prop or truncate prop, and vice-versa.

```tsx
type BadgePropsLabel = {
  label: string;
  truncate?: boolean;
};

type BadgePropsChildren = {
  children: React.ReactNode;
};

type BadgeProps = MutuallyExclusive<BadgePropsLabel, BadgePropsChildren> & {
  onClick?(): void;
  color?: keyof typeof BADGE_COLORS; // currently: gray, red
};
```

#### Basic Example

```tsx
import React from 'react';
import { Badge } from '@flmnh-mgcl/ui';

type ExampleProps = {
  useChild?: boolean;
};

function MyComponent({ useChild }: ExampleProps) {
  return useChild ? (
    <Badge>
      <p>This is my badge using a child p-tag</p>
    </Badge>
  ) : (
    <Badge label="This is my labeled badge!" />
  );
}
```

### Button

Button has an exported member [`Button.Group`](#Button.Group), as well.

#### Available Props

Button has all of the props available from a traditional HTML button element, and has the following:

```ts
type Props = {
  variant?: keyof typeof BUTTONS; // defaults to 'default'
  fullWidth?: boolean; // w-full flex-1
  rounded?: boolean; // rounded-full
  loading?: boolean;
};
```

The current running list of variants are: `primary, primaryBlue, default, danger, warning, clear, outline, danger_outline, activated`

_These variants are **very** subject to change_

#### Basic Example

```tsx
import React from 'react';
import { Button } from '@flmnh-mgcl/ui';

function MyComponent() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setLoading(false), 2000);
    }
  }, []);

  return <Button loading={isLoading}>This is my button!</Button>;
}
```

### Button.Group

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Checkmark

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Code

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Datepicker

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Divider

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Dropdown

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### FocusTrap

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Form

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Heading

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Input

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Label

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Modal

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Notification

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Portal

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Radio

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Select

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Spinner

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Statistic

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Steps

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Switch

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Table

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Tabs

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### Text

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```

### TextArea

TODO: descr

#### Available Props

```tsx

```

#### Basic Example

```tsx

```
