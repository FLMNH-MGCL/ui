import React from "react";
import {
  DeepPartial,
  FormProvider,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
} from "react-hook-form";
import Input from "./Input";
import createFormComponent from "../utils/createFormComponent";
import Radio from "./Radio";
import clsx from "clsx";
import Select from "./Select";
import TextArea from "./TextArea";

const FormInput = createFormComponent(Input);

const FormRadio = createFormComponent(Radio);

const FormSelect = createFormComponent(Select);

const FormTextArea = createFormComponent(TextArea);

type GroupProps = {
  children: React.ReactNode;
  flex?: boolean;
  hidden?: boolean;
};
function FormGroup({ children, flex, hidden }: GroupProps) {
  return (
    <div className={clsx(flex && "flex space-x-2", "py-2", hidden && "hidden")}>
      {children}
    </div>
  );
}

// function FormActions() {}

export type Values = Record<string, any>;

type FormProps<T> = {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  disabled?: boolean;
  defaultValues?: UnpackNestedValue<DeepPartial<T>>;
  mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit">;

export default function Form<T = Values>({
  children,
  onSubmit,
  defaultValues,
  autoComplete,
  disabled = false,
  mode = "onSubmit",
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
