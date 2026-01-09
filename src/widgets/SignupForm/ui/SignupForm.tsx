import { useForm } from 'react-hook-form';
import { AppLink, Button } from '@shared/ui/';
import { ArrowRightIcon } from 'lucide-react';
import { useSignup } from '@features/signup';
import { emailValidator, passwordValidator } from '@/shared/lib';
import { useNavigate } from 'react-router-dom';

type SignupFormData = {
  email: string;
  password: string;
};

export const SignupForm = () => {
  const navigate = useNavigate();
  const { signupAsync, isPending, error } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signupAsync({ email: data.email, password: data.password });
      navigate('/app/main');
    } catch (error) {
      // Ошибка уже обрабатывается в useMutation, просто не перенаправляем
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          className="px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          {...register('email', {
            required: 'Email is required',
            validate: (value) => emailValidator(value),
          })}
        />
        {errors.email && <span className="text-sm text-destructive">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          className="px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          {...register('password', {
            required: 'Password is required',
            validate: (value) => passwordValidator(value),
          })}
        />
        {errors.password && (
          <span className="text-sm text-destructive">{errors.password.message}</span>
        )}
      </div>

      {error && (
        <div className="text-sm text-destructive">
          {error instanceof Error ? error.message : 'Произошла ошибка при регистрации'}
        </div>
      )}

      <div className="flex gap-2 ml-auto">
        <Button type="submit" loading={isPending}>
          Регистрация
        </Button>
        <AppLink to="/login">
          Вход
          <ArrowRightIcon />
        </AppLink>
      </div>
    </form>
  );
};
