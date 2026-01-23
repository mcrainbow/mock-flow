import { useQuery } from '@tanstack/react-query';
import { getInterviewDetails } from '../../api';

export const useGetInterviewDetails = (interviewId: string) => {
  return useQuery({
    queryKey: ['interview-details', interviewId],
    queryFn: () => getInterviewDetails(interviewId),
    enabled: !!interviewId,
  });
};
