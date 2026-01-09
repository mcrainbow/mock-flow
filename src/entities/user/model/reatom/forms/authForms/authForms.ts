import { reatomField, reatomForm } from '@reatom/core';

import { emailValidator, passwordValidator } from '@/shared/lib';

type AuthFormState = {
  email: string;
  password: string;
};

type AuthFormProps = {
  name: string;
  onSubmitCallBack: (state: AuthFormState) => void;
  validateOnChange: boolean;
};

export const authForm = ({ name, onSubmitCallBack, validateOnChange }: AuthFormProps) =>
  reatomForm(
    {
      email: reatomField('', {
        validate: ({ state }): string | undefined => {
          return emailValidator(state);
        },
      }),
      password: reatomField('', {
        validate: ({ state }): string | undefined => passwordValidator(state),
      }),
    },
    {
      onSubmit: onSubmitCallBack,
      validateOnChange,
      name,
    }
  );
