import { auth } from '@/shared/config';

export const signupResponse = async (email: string, password: string) => {
  try {
    const response = await auth.signUp({ email, password });
    if (response.error) throw new Error(response.error.message);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('Неизвестная ошибка');
  }
};
