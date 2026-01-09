import { sleep, wrap } from '@reatom/core';
import type { FormEventHandler } from 'react';
import { bindField, reatomComponent } from '@reatom/react';

import { AppLink, Button, Input } from '@shared/ui/';
import { ArrowRightIcon } from 'lucide-react';
import { authForm } from '@entities/user';

const signupForm = authForm({
  name: 'signupForm',
  onSubmitCallBack: async (state) => {
    await wrap(sleep(2000));
    // TODO: Implement signup logic
    // console.warn('Signup state:', state);
  },
  validateOnChange: true,
});

export const SignupForm = reatomComponent(() => {
  const { submit, fields } = signupForm;
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    submit();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="your@email.com"
        {...bindField(fields.email)}
      />

      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        {...bindField(fields.password)}
      />

      <div className="flex gap-2 ml-auto">
        <Button type="submit" loading={!submit.ready()}>
          Регистрация
        </Button>
        <AppLink to="/login">
          Вход
          <ArrowRightIcon />
        </AppLink>
      </div>
    </form>
  );
});
