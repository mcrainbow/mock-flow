import { useController, useFormContext, type FieldValues, type FieldPath } from 'react-hook-form';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';

interface CustomInputProps<
  T extends FieldValues = FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<T>;
  label: string;
}

export function FormInput<T extends FieldValues>({ name, label, ...props }: CustomInputProps<T>) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: {
      required: 'This field is required',
      ...(props.type === 'email' && {
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
          message: 'Invalid email',
        },
      }),
      ...(props.type === 'password' && {
        minLength: {
          value: 8,
          message: 'Min 8 characters',
        },
      }),
    },
  });

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-primary font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        {...field}
        {...props}
        value={field.value || ''} // ✅ ВОТ ЭТО КЛЮЧЕВАЯ СТРОКА
        className={cn(
          'bg-primary/20 border border-primary/50 rounded-md p-2 w-full',
          error && 'border-warning'
        )}
      />
      {error && <p className="text-warning text-sm">{error.message}</p>}
    </div>
  );
}
