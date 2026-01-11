// features/auth/model/useInitializeAuth.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { auth } from '@shared/config';
import type { User } from '@supabase/supabase-js';
import { initializeAuth } from '@entities/api';
import { getUserInformationAPI } from '@entities/api';
import { userInfoAtom } from '../reatom';

export const useInitializeAuth = () => {
  const queryClient = useQueryClient();
  // const dispatch = useDispatch(); reatom
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
      userInfoAtom.set((prev) => ({
        ...prev,
        user: {
          id: userData.uid,
          email: userData.email,
          name: userData.nickname,
          avatar: userData.avatar,
        },
        isAuthed: true,
      }));
    }
  }, [userData]);

  const isLoading = useMemo(
    () => isAuthLoading || isUserDataLoading,
    [isAuthLoading, isUserDataLoading]
  );

  return { data, isLoading, error };
};
