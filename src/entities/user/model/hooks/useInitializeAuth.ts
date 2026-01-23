// features/auth/model/useInitializeAuth.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { auth } from '@shared/config';
import type { User } from '@supabase/supabase-js';
import { initializeAuth, getUserInformationAPI, getUserStats } from '@entities/user/api';
import { useUserStore } from '../store';

export const useInitializeAuth = () => {
  const queryClient = useQueryClient();
  const { setUser, setAuth, updateUserStats } = useUserStore();
  const {
    data,
    isLoading: isAuthLoading,
    error,
  } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: initializeAuth,
    staleTime: Infinity,
    retry: false,
  });

  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ['user', data?.id],
    queryFn: () => getUserInformationAPI(data?.id),
    enabled: !!data?.id,
  });

  // Загрузка статистики пользователя
  const { data: userStats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['user', 'stats', data?.id],
    queryFn: () => getUserStats(data?.id || ''),
    enabled: !!data?.id,
  });

  useEffect(() => {
    // Подписываемся на изменения состояния авторизации
    const {
      data: { subscription },
    } = auth.onAuthStateChange((_event, session) => {
      // Обновляем кеш React Query при изменении состояния авторизации
      queryClient.setQueryData<User | null>(['auth', 'session'], session?.user ?? null);
    });

    // Отписываемся при размонтировании компонента
    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  useEffect(() => {
    if (userData) {
      setUser({
        id: userData.uid,
        email: userData.email,
        name: userData.nickname,
        avatar: userData.avatar,
      });
      setAuth(true);
    }
  }, [userData, setUser, setAuth]);

  // Обновляем статистику когда она загрузилась
  useEffect(() => {
    if (userStats) {
      updateUserStats({
        completed_interviews: userStats.completed_interviews,
        skipped_interviews: userStats.skipped_interviews,
        started_interviews: userStats.total_interviews,
      });
    }
  }, [userStats, updateUserStats]);

  const isLoading = useMemo(
    () => isAuthLoading || isUserDataLoading || isStatsLoading,
    [isAuthLoading, isUserDataLoading, isStatsLoading]
  );

  return { data, isLoading, error };
};
