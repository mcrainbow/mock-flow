import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Question } from '../types';
import type { QuestionReview } from '@entities/question/model';

interface QuestionStore {
  questions: Question[];
  currentQuestionIndex: number;
  isTextQuestionAnswered: boolean;
  userTextReview: QuestionReview | null;

  // Actions
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (currentQuestionIndex: number) => void;
  setIsTextQuestionAnswered: (isTextQuestionAnswered: boolean) => void;
  setUserTextReview: (userTextReview: QuestionReview) => void;
}

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  isTextQuestionAnswered: false,
  userTextReview: null,
};

export const useQuestionStore = create<QuestionStore>()(
  devtools(
    (set) => ({
      ...initialState,

      // Actions
      setQuestions: (questions: Question[]) =>
        set({ questions }, false, 'setQuestions'),
      setCurrentQuestionIndex: (currentQuestionIndex: number) =>
        set({ currentQuestionIndex }, false, 'setCurrentQuestionIndex'),
      setIsTextQuestionAnswered: (isTextQuestionAnswered: boolean) =>
        set({ isTextQuestionAnswered }, false, 'setIsTextQuestionAnswered'),
      setUserTextReview: (userTextReview: QuestionReview) =>
        set({ userTextReview }, false, 'setUserTextReview'),
    }),
    { name: 'question-store' }
  )
);
