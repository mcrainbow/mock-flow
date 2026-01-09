export const passwordValidator = (state: string): string | undefined => {
  if (state === '') {
    return 'Password is required';
  }
  if (state.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return undefined;
};
