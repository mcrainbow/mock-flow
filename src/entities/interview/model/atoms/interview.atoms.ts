import { atom } from '@reatom/core';

type InterviewSelectors = {
  level: 'junior' | 'middle' | 'senior';
  technology: 'React' | 'TypeScript' | 'JavaScript' | 'FSD';
  count: string;
};

export const isInterviewStarted = atom<boolean>(false, 'isInterviewStarted');

export const interviewSelectors = atom<InterviewSelectors>(
  {
    level: 'junior',
    technology: 'React',
    count: '10',
  },
  'interviewSelectors'
);
