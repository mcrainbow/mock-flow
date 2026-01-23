import { fetchUserInterviews } from '@/entities/interview/api';
import { useUserStore } from '@/entities/user/model/store';
import { useQuery } from '@tanstack/react-query';

export const useGetUserInterviews = () => {
  const userId = useUserStore((state) => state.user.id);
  return useQuery({
    queryKey: ['user-interviews', userId],
    queryFn: () => fetchUserInterviews(userId),
    enabled: !!userId,
    staleTime: 0, // Данные всегда считаются устаревшими
    refetchOnMount: 'always', // Всегда обновлять при монтировании
    refetchOnWindowFocus: true, // Обновлять при фокусе на окно
  });
};
