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

There is now an installable [plugin](https://www.npmjs.com/package/@flmnh-mgcl/ui-tailwind-config) available. To use the classes defined for the corresponding UI, install the plugin and add it to your own `tailwind.config.js` file as you would any other plugin.

```bash
yarn add @flmnh-mgcl/ui-tailwind-config
```

```js
// -- tailwind.config.js --

module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  // ADD PLUGIN HERE
  plugins: [require('@flmnh-mgcl/ui-tailwind-config')],
};
```

## Contributing

Feel free to contribute and make this project better! There are definitely areas that can be improved overall!

If you want to contribute, try to tackle any **existing issues on GitHub first** before attempting any other contributions.

## Components Available

_This project is still under active development, components will be added / altered throughout the duration of the project. These are the currently available components:_

- [Accordion](#accordion)
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

### Accordion

#### Available Props

```tsx
export type AccordionItemProps = {
  open: boolean;
  title: string;
  content: string | string[] | React.ReactChild;
  onClick(): void;
};

export type AccordionProps = {
  items: Omit<AccordionItemProps, 'open' | 'onClick'>[];
};
```

#### Basic Example

```tsx
import React from 'react';
import { Accordion } from '@flmnh-mgcl/ui';

const items = [
  {
    title: 'This is a React.ReactNode Accordion Item',
    content: (
      <div className="flex flex-col space-y-3">
        <Text>This is an example of a React.ReactNode Accordion Item.</Text>

        <Text>
          I developed it to allow for strings / string arrays / React.ReactNodes
          to allow for more customization, so that you can do more complex
          Accordion Items if needed.
        </Text>
      </div>
    ),
  },
  {
    title: 'This one is just a basic string content',
    content:
      'It will be rendered as a single <Text> component with {content} as the child',
  },
  {
    title: 'This one is just a string[] content',
    content:
      'It will be rendered as multiple <Text> components, one for each element in the content array, emulating paragraphs',
  },
];

function MyComponent() {
  return <Accordion items={items} />;
}
```

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
import React, { useState } from 'react';
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

Button.Group is really just a predefined, wrapping div for Button components. I typically use them in my Table footers or Modal footers.

#### Available Props

```tsx
type ButtonGroupProps = {
  children: React.ReactNode;
  className?: string;
  gap?: keyof typeof BUTTON_GAPS; // sm, md, lg
};
```

#### Basic Example

```tsx
import React from 'react';
import { Button } from '@flmnh-mgcl/ui';

function MyComponent() {
  return (
    <Button.Group>
      <Button>Left</Button>
      <Button variant="primary">Right</Button>
    </Button.Group>
  );
}
```

### Checkmark

This is a rewrite of an external [component](https://github.com/stanleyxu2005/react-checkmark), as it was throwing type errors directly from source. It is an animated checkmark.

#### Available Props

The props are interpreted directly from the source code linked above.

```tsx
interface CheckmarkProps {
  size?: keyof typeof namedSizes; // small, medium, large, xLarge, xxLarge
  color?: string;
}
```

#### Basic Example

```tsx
import React from 'react';
import { Checkmark } from '@flmnh-mgcl/ui';

function MyComponent() {
  return <Checkmark size="large" color="red" />;
}
```

### Code

The Code component is a wrapper for the Prism component from `react-syntax-hightlighter`. I made this a custom, reusable component to inject some of the common changes I make:

#### Available Props

```tsx
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
  theme?: 'light' | 'dark'; // default: localStorage.theme ?? 'dark'
  maxHeight?: string;
};
```

Please note: this is another mutually exclusive Prop. You may either use a `codeString` OR `children` with this component, but not both.

#### Basic Example

```tsx
import React from 'react';
import { Code } from '@flmnh-mgcl/ui';

function MyComponent() {
  return <Code language="sql" codeString="SELECT * FROM myTable;" />;
}
```

### Datepicker

Datepicker is a styled wrapper around `react-day-picker`. Internally, it utilizes `react-hook-form` via the rendered [Input](#input) component that displays the date / date range.

#### Available Props

```tsx
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
```

#### Basic Example

```tsx
import React from 'react';
import { Datepicker } from '@flmnh-mgcl/ui';

function MyComponent() {
  return (
    <div className="flex flex-col space-y-4">
      <Datepicker
        fullWidth
        name="mySinglePicker"
        label="mySinglePicker"
        placeholder={new Date().toISOString().split('T')[0]}
        register={{ validate: validatorFunction }}
        initialDate={new Date()}
      />
      <Datepicker
        fullWidth
        name="mySinglePicker2"
        label="mySinglePicker2"
        placeholder={new Date().toISOString().split('T')[0]}
        register={{ validate: validatorFunction }}
        defaultValue="2021-01-15"
      />
      <Datepicker
        fullWidth
        ranged
        name="myRangedPicker"
        label="myRangedPicker"
        register={{ validate: validatorFunction }}
        initialDate={{ from: new Date(), to: new Date() }}
      />
      {/* NOTE: example 3 throws a type error currently, and will be fixed in a future version */}
    </div>
  );
}
```

### Divider

Divider is a simple horizontal line meant to separate bodies of text or other UI sections.

#### Available Props

```tsx
export type DividerProps = {
  text?: string;
};
```

#### Basic Example

```tsx
import React from 'react';
import { Divider } from '@flmnh-mgcl/ui';

function MyComponent() {
  return (
    <div>
      <p>section 1</p>
      <Divider />
      <p>section 2</p>
      <Divider text="and" />
      <p>section 3</p>
    </div>
  );
}
```

### Dropdown

Dropdown is separate from [Select](#select) components; Select is meant to be a form-based component, whereas Dropdown is meant to be a menu type component.

Dropdown has three internal members: `Item`, `Section` and `Header`. The props for all 3, in addition to the Dropdown component itself, are as follows:

#### Available Props

```tsx
export type DropdownItemProps = {
  text: string;
  onClick?(): void;
};

export type DropdownSectionProps = { children: React.ReactNode };

export type DropdownHeaderProps = {
  text: string;
};

export type DropdownProps = {
  open?: boolean; // default: false
  label?: string;
  origin?: 'left' | 'right'; // default: left
  labelIconPosition?: 'left' | 'right'; // default: left
  rounded?: boolean;
  labelIcon?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
};
```

#### Basic Example

In this example, I will use all of the exported members of Dropdown:

```tsx
import React from 'react';
import { Dropdown } from '@flmnh-mgcl/ui';

function MyComponent() {
  return (
    <Dropdown label="Menu" labelIcon={<MyIcon />}>
      <Dropdown.Header text="Options" />
      <Dropdown.Section>
        <Dropdown.Item text="Option 1" onClick={() => navigate('place-1')} />
        <Dropdown.Item text="Option 2" onClick={() => navigate('place-2')} />
      </Dropdown.Section>
      <Dropdown.Section>
        <Dropdown.Item text="Option 3" onClick={() => doSomething()} />
      </Dropdown.Section>
    </Dropdown>
  );
}
```

### FocusTrap

FocusTrap is used internally by [Modal](#modal). It will attempt to focus on the first focusable child element.

#### Available Props

```tsx
export type FocusTrapProps = {
  children: NonNullable<React.ReactNode>;
  disabled?: boolean;
};
```

#### Basic Example

Here is a stripped example of how it is used in the Modal component:

```tsx
import React from 'react';
import { FocusTrap } from '@flmnh-mgcl/ui';

function MyComponent() {
  return <FocusTrap> ... {children} ... </FocusTrap>;
}
```

### Form

Form has multiple exported members. The default export is the Form component, itself, which internally uses `react-hook-form`. The exported members are the standard UI components (Select, Input, etc). but altered to be compatible with the Form component.

The available exported members are: `Form.Input`, `Form.Area`, `Form.Select`, `Form.Radio` and `Form.Group`

#### Available Props

The Props for Form, as well as some of the exported members, is as follows:

```tsx
export type FormProps<T> = {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  disabled?: boolean;
  defaultValues?: UnpackNestedValue<DeepPartial<T>>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export type FormGroupProps = {
  children: React.ReactNode;
  flex?: boolean;
  hidden?: boolean;
};
```

The following Props are injected into the other UI elements of Form:

```tsx
type InjectedProps<T extends {}> = Omit<T, 'ref' | 'errors' | 'error'> & {
  register?: ValidationRules; // => from react-hook-form
  assignOnChange?: (
    something: Record<string, string>
  ) => Record<string, string>;
};
```

#### Basic Example

```tsx
import React from 'react';
import { Form, FormSubmitValues, SelectOption } from '@flmnh-mgcl/ui';

const options: SelectOption[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

function MyComponent() {
  function handleSubmit(values: FormSubmitValues) {
    console.log(values); // {fieldOne, fieldTwo, areaField}
  }

  return (
    <Form onSubmit={handleSubmit} id="myForm">
      <Form.Group flex>
        <Form.Input
          name="fieldOne"
          label="Field One"
          register={{ validate: (value: string) => value !== 'test' }}
          fullWidth
        />

        <Form.Select
          name="fieldTwo"
          label="Field Two"
          options={options}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Area
          name="areaField"
          label="My Area Field"
          placeholder="Type something!"
          rows={4}
        />
      </Form.Group>

      <Button type="submit">Submit!</Button>
    </Form>
  );
}
```

### Heading

Heading is just an h-tag with some preconfigured styles and options.

#### Available Props

```tsx
export type HeadingProps = {
  tag?: keyof typeof HEADINGS;
  size?: keyof typeof TEXT_SIZES;
  className?: string;
  centered?: boolean;
  children: React.ReactNode;
};
```

#### Basic Example

```tsx
import React from 'react';
import { Heading } from '@flmnh-mgcl/ui';

function MyComponent() {
  return <Heading>My Heading!</Heading>;
}
```

### Input

Input is a standard input with additional props.

#### Available Props

```tsx
export type InputProps = {
  label?: string;
  fullWidth?: boolean;
  slim?: boolean;
  icon?: keyof typeof INPUT_ICONS; // password, passwordVisible, user, atMention, search
  iconClick?(): void;
} & React.ComponentProps<'input'>;
```

#### Basic Example

I would normally use the Form variants for this example, but for demonstrative purposes I will not

```tsx
import React, { useState } from 'react';
import { Input } from '@flmnh-mgcl/ui';

function MyComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  function togglePasswordVisibility() {
    if (visible) setVisible(false);
    else setVisible(true);
  }

  return (
    <div className="flex flex-col space-y-3">
      <Input
        label="Username"
        icon="user"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      <Input
        label="Password"
        icon={visible ? 'passwordVisible' : 'password'}
        iconClick={togglePasswordVisibility}
        value={password}
        type={visible ? 'text' : 'password'}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
    </div>
  );
}
```

### Label

Label is the same label used in the other UI components that have one internally (Select, Input, etc).

#### Available Props

```tsx
export type LabelProps = {
  fullWidth?: boolean;
} & React.ComponentProps<'label'>;
```

#### Basic Example

```tsx
import React from 'react';
import { Label } from '@flmnh-mgcl/ui';

function MyComponent() {
  return (
    <div>
      <Label className="py-2">My Label</Label>
      <p>....</p>
    </div>
  );
}
```

### Modal

Modal is a pop-up modal, utilizing a Portal and Focus Trap internally. It is animated using `framer-motion`.

You will need to use all exported members to get the styling of the modal correct: `Modal.Footer` and `Modal.Content`

#### Available Props

```tsx
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
```

#### Basic Example

```tsx
import React, { useState } from 'react';
import { Button, Modal } from '@flmnh-mgcl/ui';

function MyComponent() {
  const [visible, setVisible] = useState(false);

  function on() {
    setVisible(true);
  }

  function off() {
    setVisible(false);
  }

  return (
    <React.Fragment>
      <Modal open={visible} onClose={off}>
        <Modal.Content title="My Modal">This is my basic modal</Modal.Content>
        <Modal.Footer>
          <Button onClick={off}>Okay!</Button>
        </Modal.Footer>
      </Modal>

      <Button onClick={on}>Toggle Modal</Button>
    </React.Fragment>
  );
}
```

### Notification

Notification is a component designed to work with `react-notification-system`, however it is generalized enough that I included it in the component library. In order to use it as intended, please review the documentation for [`react-notification-system`](https://github.com/igorprado/react-notification-system), however.

#### Available Props

```tsx
export type NotificationProps = {
  title: string;
  message: string;
  level: 'error' | 'success' | 'warning' | 'info';
};
```

#### Basic Example

```tsx
import React from 'react';
import { Notification } from '@flmnh-mgcl/ui';

function MyComponent() {
  return (
    <Notification
      title="Error Occurred"
      message="Please review the appropriate logs"
      level="error"
    />
  );
}
```

### Portal

Portal is just a simple component to render a react-dom portal. You may use it as you would normally (see [this](https://reactjs.org/docs/portals.html) for information about portals).

#### Available Props

```tsx
export type PortalProps = { children: React.ReactNode };
```

#### Basic Example

```tsx
import React from 'react';
import { Portal } from '@flmnh-mgcl/ui';

function MyComponent() {
  return (
    <Portal>
      <div>... content ...</div>
    </Portal>
  );
}
```

### Radio

Radio is a checkbox component. It may be controlled, or used with a Form via `Form.Radio`.

#### Available Props

```tsx
export type RadioProps = {
  checked?: boolean;
  label?: string;
  stacked?: boolean; // flex-col
} & React.ComponentProps<'input'>;
```

#### Basic Example

```tsx
import React, { useState } from 'react';
import { Radio } from '@flmnh-mgcl/ui';

function MyComponent() {
  const [checked, setChecked] = useState(false);

  function toggle() {
    if (checked) setChecked(false);
    else setChecked(true);
  }
  return (
    <div className="flex flex-col space-y-4">
      <Radio label="Radio 1" />
      <Radio label="Radio 2" stacked />
      <Radio label="Radio 2" checked={checked} onChange={toggle} />
    </div>
  );
}
```

### Select

Select is a UI wrapper for a select html element. It is functional, however needs to be rewritten.

More thorough documentation will be written after this eventual rewrite.

#### Available Props

```tsx
export type SelectProps = {
  slim?: boolean;
  searchable?: boolean;
  label?: string;
  fullWidth?: boolean;
  options: SelectOption[];
  updateControlled?(newVal: any): void;
} & React.ComponentProps<'select'>;
```

#### Basic Example

```tsx
import React from 'react';
import { Select, SelectOption } from '@flmnh-mgcl/ui';

const options: SelectOption[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

function MyComponent() {
  const [selected, setSelected] = useState();

  return (
    <React.Fragment>
      <Form.Select
        name="select"
        options={options}
        value={selected}
        label="Select an option"
        updateControlled={(newVal: any) => {
          setSelected(newVal);
        }}
      />
    </React.Fragment>
  );
}
```

### Spinner

Spinner is a loading component, and may be used inline or absolute.

#### Available Props

```tsx
export type SpinnerProps = {
  active?: boolean;
  size?: keyof typeof SPINNER_SIZES; // default: md
  inline?: boolean;
  color?: 'gray' | 'white'; // default: gray
};
```

#### Basic Example

```tsx
import React from 'react';
import PageContainer from './components/PageContainer'
import { Spinner } from '@flmnh-mgcl/ui';

type Props = {...}

function MyComponent({ children, loading }: Props) {
  return (
    <PageContainer>
      <Spinner active={loading} size="lg" />
      {children}
    </PageContainer>
  );
}
```

### Statistic

Statistic is a basic component for rendering number / string pairs. For now, it only supports one configuration: numerical statistic value on top, statistic label underneath.

#### Available Props

```tsx
export type StatisticProps = {
  value?: number;
  percent?: boolean;
  unit: string;
};
```

#### Basic Example

```tsx
import React from 'react';
import { Statistic } from '@flmnh-mgcl/ui';

function MyComponent() {
  return <Statistic value={102} unit="people" />;
}
```

### Steps

Steps utilizes a typed wrapper for `react-step-progress-bar`, however it is used internally in the Steps component and therefore has separate props. I use it for multi-step forms mostly, however it may be used for other purposes.

#### Available Props

```tsx
export type StepsProps = {
  steps: number;
  current: number;
};
```

#### Basic Example

```tsx
import React, { useState } from 'react';
import { Steps, Button } from '@flmnh-mgcl/ui';

function MyComponent({ pages }: Props) {
  const [page, setPage] = useState(0);

  function paginateForward() {
    // ....
  }

  function paginateBackward() {
    // ....
  }

  function renderPage() {
    // ...
  }

  return (
    <div>
      <Steps steps={pages.length} current={page} />

      {renderPage()}

      <div>
        <Button.Group>
          <Button onClick={paginateBackward}>Back</Button>
          <Button onClick={paginateForward}>Continue</Button>
        </Button.Group>
      </div>
    </div>
  );
}
```

### Switch

Switch component is a toggle slider, it is styled after TailwindUI.

#### Available Props

```tsx
export type SwitchProps = {
  enabled: boolean;
  onToggle(): void;
};
```

#### Basic Example

```tsx
import React, { useState } from 'react';
import { Switch, Label } from '@flmnh-mgcl/ui';

function MyComponent() {
  const [theme, setTheme] = useState(localStorage.theme ?? 'dark');

  function toggle() {
    // ...
  }

  return (
    <div className="flex space-x-2 items-center">
      <Label>Light Theme</Label>
      <Switch enabled={theme === 'dark'} onToggle={toggle} />
      <Label>Dark Theme</Label>
    </div>
  );
}
```

### Table

Table is still currently incomplete. As of now, it can render a simple, non-virtualized table with static headers. It will support more dynamic tables and table features in the future.

#### Available Props

the type of TableProps is the union of TableProps from `react-virtualized`, with `height` and `width` omitted, and the following definition following the '&':

```tsx
export type TableProps = Omit<VTableProps, 'width' | 'height'> & {
  basic?: boolean;
  data: Object[];
  activeIndex?: number;
  headers: string[];
  loading?: boolean;
  sortable?: boolean;
  containerClassname?: string;
};
```

`width` and `height` are omitted because Table uses an autosizer internally for the virtualized variant.

#### Basic Example

As the virtualized table is not quite ready, only the basic table will be used in the example below.

```tsx
import React from 'react';
import { Table } from '@flmnh-mgcl/ui';

function MyComponent() {
  // BASIC TABLE
  return (
    <Table
      basic
      data={[
        {
          1: 'value',
          2: 'value',
        },
        {
          1: 'value2',
          2: 'value2',
        },
        {
          1: 'value3',
          2: 'value3',
        },
      ]}
      headers={['1', '2']}
    />
  );
}
```

### Tabs

Tabs is a tab menu component. Currently, it does not support linked tabs (i.e. router basic tab menu), however this is something that is planned.

#### Available Props

```tsx
export type TabProps = {
  text: string;
  onClick(): void;
  fullWidth?: boolean;
  active?: boolean;
};
```

#### Basic Example

Setting the tab on change is handled internally, all it needs is the state dispatch function:

```tsx
import React, { useState } from 'react';
import { Tabs } from '@flmnh-mgcl/ui';

function SettingsPage() {
  const [tab, setTab] = useState(0);

  function renderTab() {
    // ...
  }

  return (
    <div>
      <Tabs
        fullWidth
        tabs={['General', 'Profile']}
        selectedIndex={tab}
        onChange={setTab}
      />

      <div>{renderTab()}</div>
    </div>
  );
}
```

### Text

Text is a pre-styled p-tag component. It does support onClick events, and has the following additional props:

#### Available Props

```tsx
export type TextProps = {
  variant?: keyof typeof TEXT;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  onClick?(): void;
} & PropsOf<'p'>;
```

#### Basic Example

```tsx
import React from 'react';
import { Text } from '@flmnh-mgcl/ui';

function MyComponent() {
  return <Text size="sm">This is my paragraph</Text>;
}
```

### TextArea

TextArea is a standard textarea with additional props.

#### Available Props

```tsx
export type TextAreaProps = {
  label?: string;
  fullWidth?: boolean;
} & React.ComponentProps<'textarea'>;
```

#### Basic Example

```tsx
import React, { useState } from 'react';
import { TextArea } from '@flmnh-mgcl/ui';

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <TextArea
      name="myValue"
      label="Value"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```
