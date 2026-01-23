import { fetchLastUserInterview } from '@/entities/interview/api';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/entities/user/model/store';

export const useGetLastUserInterview = () => {
  const userId = useUserStore((state) => state.user.id);
  return useQuery({
    queryKey: ['last-user-interview', userId],
    queryFn: () => fetchLastUserInterview(userId),
    enabled: !!userId, // Запрос выполняется только если userId существует
    refetchOnMount: 'always', // Всегда обновлять данные при монтировании компонента
    staleTime: 0, // Считать данные устаревшими сразу
  });
};
