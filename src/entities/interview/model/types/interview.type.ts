export interface Interview {
  // Идентификаторы
  id: string;
  user_id: string;

  // Основная информация
  category: string;
  difficulty: 'junior' | 'junior+' | 'middle' | 'middle+' | 'senior';
  interview_type: 'checkbox' | 'text';

  // Статус и прогресс
  status: 'in_progress' | 'completed' | 'skipped';
  current_question_index: number;
  total_questions: number;
  correct_answers_count: number;

  // Результаты
  score: number; // 0-10
  total_time_spent: number; // в секундах

  // Временные метки
  started_at: string; // ISO 8601 timestamptz
  updated_at: string; // ISO 8601 timestamptz
  completed_at: string | null; // nullable
}
