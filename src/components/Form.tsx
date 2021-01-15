import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from './Input';
import createFormComponent from '../utils/createFormComponent';
import Radio from './Radio';
import clsx from 'clsx';
import Select from './Select';
import TextArea from './TextArea';
import { FormGroupProps, FormProps, FormSubmitValues } from 'types';

const FormInput = createFormComponent(Input);

const FormRadio = createFormComponent(Radio);

const FormSelect = createFormComponent(Select);

const FormTextArea = createFormComponent(TextArea);

function FormGroup({ children, flex, hidden }: FormGroupProps) {
  return (
    <div className={clsx(flex && 'flex space-x-2', 'py-2', hidden && 'hidden')}>
      {children}
    </div>
  );
}

// function FormActions() {}

export default function Form<T = FormSubmitValues>({
  children,
  onSubmit,
  defaultValues,
  autoComplete,
  disabled = false,
  mode = 'onSubmit',
  ...props
}: FormProps<T>) {
  const form = useForm<T>({
    defaultValues,
    mode,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

Form.Input = FormInput;
Form.Area = FormTextArea;
Form.Select = FormSelect;
Form.Radio = FormRadio;
Form.Group = FormGroup;
