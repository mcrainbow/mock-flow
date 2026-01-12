import { supabase } from '@shared/config';

export const fetchQuestions = async (level: string, technology: string, count: string) => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('difficulty', level)
    .eq('topic', technology)
    .limit(parseInt(count));
  if (error) {
    throw new Error(error.message);
  }

  const shuffled = data.sort(() => Math.random() - 0.5);
  const randomQuestions = shuffled.slice(0, parseInt(count));

  return randomQuestions;
};
