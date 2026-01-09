export const emailValidator = (state: string): string | undefined => {
  if (state === '') {
    return 'Email is required';
  }
  if (!state.includes('@')) {
    return 'Email must contain @';
  }
  if (!state.includes('.')) {
    return 'Email must contain .';
  }
  return undefined;
};
