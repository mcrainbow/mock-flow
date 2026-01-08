import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import type { SignupFormFieldsTypes } from '../lib/types/signupFormFieldsTypes';
import { AppLink, Button, FormInput } from '@shared/ui/';
import { ArrowRightIcon } from 'lucide-react';

export function SignupForm() {
  const methods = useForm<SignupFormFieldsTypes>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SignupFormFieldsTypes> = (data) => {
    console.log(data);
  };

  return (
    // ✅ FormProvider оборачивает всю форму
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        {/* ✅ Теперь просто передаём name и label */}
        <FormInput name="email" label="Email" type="email" placeholder="your@email.com" />

        <FormInput name="password" label="Password" type="password" placeholder="••••••••" />

        <div className="flex gap-2 ml-auto">
          <Button type="submit">Регистрация</Button>
          <AppLink to="/login">
            Вход
            <ArrowRightIcon />
          </AppLink>
        </div>
      </form>
    </FormProvider>
  );
}
