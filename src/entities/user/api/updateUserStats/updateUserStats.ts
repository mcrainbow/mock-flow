// src/entities/user/api/updateUserStats.ts
import { supabase } from '@shared/config';

export const incrementStartedInterviews = async (userId: string) => {
  const { error } = await supabase.rpc('increment_started_interviews', {
    user_uid: userId,
  });

  if (error) throw new Error(error.message);
};

export const incrementCompletedInterviews = async (userId: string) => {
  const { error } = await supabase.rpc('increment_completed_interviews', {
    user_uid: userId,
  });

  if (error) throw new Error(error.message);
};

export const incrementSkippedInterviews = async (userId: string) => {
  const { error } = await supabase.rpc('increment_skipped_interviews', {
    user_uid: userId,
  });

  if (error) throw new Error(error.message);
};
