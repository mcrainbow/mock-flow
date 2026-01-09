import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import type { LoginFromFieldsTypes } from '../lib/types/loginFromFieldsTypes';
import { AppLink, Button, FormInput } from '@shared/ui/';
import { ArrowRightIcon } from 'lucide-react';

export function LoginForm() {
  const methods = useForm<LoginFromFieldsTypes>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<LoginFromFieldsTypes> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <FormInput name="email" label="Email" type="email" placeholder="your@email.com" />

        <FormInput name="password" label="Password" type="password" placeholder="••••••••" />

        <div className="flex gap-2 ml-auto">
          <Button type="submit">Вход</Button>
          <AppLink to="/signup">
            Регистрация
            <ArrowRightIcon />
          </AppLink>
        </div>
      </form>
    </FormProvider>
  );
}
