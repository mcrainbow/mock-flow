import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Interview } from '@entities/interview/model/types';

export type InterviewType = 'Текстовый' | 'С выбором ответов';
export type Level = 'intern' | 'Junior' | 'Junior+' | 'Middle' | 'Middle+' | 'Senior';
export type Technology =
  | 'React'
  | 'TypeScript'
  | 'JavaScript'
  | 'FSD Структура'
  | 'Next.js'
  | 'Git';

interface InterviewStore {
  isStarted: boolean;
  interviewType: InterviewType;
  level: Level;
  technology: Technology;
  count: number;
  isLoading: boolean;
  error: string | null;
  activeInterview: Interview | null;

  userStats: {
    total_interviews: number;
    completed_interviews: number;
    in_progress_interviews: number;
    skipped_interviews: number;
    average_score: number;
    best_score: number;
    worst_score: number;
    total_time_spent: number;
  };

  interviewResults: {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    totalTimeSpent: number;
    interviewType: 'checkbox' | 'text';
  } | null;

  // Actions
  setStarted: (isStarted: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setInterviewType: (interviewType: InterviewType) => void;
  setLevel: (level: Level) => void;
  setTechnology: (technology: Technology) => void;
  setCount: (count: number) => void;
  setActiveInterview: (activeInterview: Interview) => void;
  setInterviewResults: (results: InterviewStore['interviewResults']) => void;
  clearInterviewResults: () => void;
  reset: () => void;
}

const initialState = {
  isStarted: false,
  interviewType: 'Текстовый' as InterviewType,
  level: 'Junior' as Level,
  technology: 'React' as Technology,
  count: 5,
  isLoading: false,
  error: null,
  activeInterview: null as Interview | null,
  interviewResults: null,
};

export const useInterviewStore = create<InterviewStore>()(
  devtools(
    (set) => ({
      ...initialState,

      // Actions
      setStarted: (isStarted: boolean) => set({ isStarted }, false, 'setStarted'),

      setLoading: (isLoading: boolean) => set({ isLoading }, false, 'setLoading'),

      setError: (error: string | null) => set({ error }, false, 'setError'),

      setInterviewType: (interviewType) => set({ interviewType }, false, 'setInterviewType'),

      setLevel: (level) => set({ level }, false, 'setLevel'),

      setTechnology: (technology) => set({ technology }, false, 'setTechnology'),

      setCount: (count) => set({ count }, false, 'setCount'),

      setActiveInterview: (activeInterview) =>
        set({ activeInterview }, false, 'setActiveInterview'),

      setInterviewResults: (results) =>
        set({ interviewResults: results }, false, 'setInterviewResults'),

      clearInterviewResults: () => set({ interviewResults: null }, false, 'clearInterviewResults'),

      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'interview-store' }
  )
);
