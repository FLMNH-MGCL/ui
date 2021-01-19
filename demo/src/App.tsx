import React, { useState } from 'react';
import {
  Input,
  Button,
  Form,
  Select,
  SelectOption,
  Label,
  TextArea,
} from '@flmnh-mgcl/ui';

const options: SelectOption[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

function App() {
  const [selected, setSelected] = useState();
  return (
    <div className="max-w-2xl">
      <Input name="" label="" />

      <Select
        name="select"
        options={options}
        value={selected}
        label="Select an option"
        updateControlled={(newVal: any) => {
          setSelected(newVal);
        }}
      />

      <TextArea rows={4} form="" name="" id="">
        ff
      </TextArea>

      <Form.Input name="" label="" register={{ validate: () => {} }} />

      <Label>fjdkal;df</Label>

      <Button>f</Button>
    </div>
  );
}

export default App;
