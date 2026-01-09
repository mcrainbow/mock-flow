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
<<<<<<< HEAD
=======
    // ✅ FormProvider оборачивает всю форму
>>>>>>> origin/main
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md"
      >
<<<<<<< HEAD
=======
        {/* ✅ Теперь просто передаём name и label */}
>>>>>>> origin/main
        <FormInput name="email" label="Email" type="email" placeholder="your@email.com" />

        <FormInput name="password" label="Password" type="password" placeholder="••••••••" />

        <div className="flex gap-2 ml-auto">
<<<<<<< HEAD
          <Button type="submit">Зарегестрироваться</Button>
=======
          <Button type="submit">Регистрация</Button>
>>>>>>> origin/main
          <AppLink to="/login">
            Вход
            <ArrowRightIcon />
          </AppLink>
        </div>
      </form>
    </FormProvider>
  );
}
