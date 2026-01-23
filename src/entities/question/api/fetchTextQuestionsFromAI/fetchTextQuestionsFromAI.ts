import { supabase } from '@shared/config';
import {
  type FetchTextQuestionsFromAIParams,
  type AITextQuestionsResponse,
} from '@entities/question/model';

export async function fetchTextQuestionsFromAI({
  topic,
  level,
  count,
}: FetchTextQuestionsFromAIParams): Promise<AITextQuestionsResponse> {
  const message = `topic=${topic}, level=${level}, count=${count}`;

  const { data, error } = await supabase.functions.invoke('get_text_questions', {
    body: { message },
  });

  if (error) {
    throw new Error(`Failed to fetch text questions: ${error.message}`);
  }

  if (!data) {
    throw new Error('No data returned from Edge Function');
  }

  if (!data.result || !Array.isArray(data.result) || data.result.length === 0) {
    throw new Error('Invalid response structure: missing result array');
  }

  const firstResult = data.result[0];

  if (
    !firstResult.content ||
    !Array.isArray(firstResult.content) ||
    firstResult.content.length === 0
  ) {
    throw new Error('Invalid response structure: missing content');
  }

  const textContent = firstResult.content[0].text;

  if (typeof textContent !== 'string') {
    throw new Error('Invalid response structure: text is not a string');
  }

  let questionsData: AITextQuestionsResponse;
  try {
    // Пытаемся очистить JSON от возможных markdown-блоков
    let cleanedContent = textContent.trim();

    // Убираем markdown code blocks если есть
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.replace(/^```json\s*/, '').replace(/```\s*$/, '');
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.replace(/^```\s*/, '').replace(/```\s*$/, '');
    }

    // Проверяем, что JSON не обрезан (последний символ должен быть })
    if (!cleanedContent.endsWith('}')) {
      console.error(
        '⚠️ JSON appears to be truncated. Last 100 chars:',
        cleanedContent.substring(cleanedContent.length - 100)
      );
      // Пытаемся найти последнюю валидную закрывающую скобку
      const lastValidBrace = cleanedContent.lastIndexOf('}');
      if (lastValidBrace > 0) {
        cleanedContent = cleanedContent.substring(0, lastValidBrace + 1);
      }
    }

    questionsData = JSON.parse(cleanedContent);
  } catch (parseError) {
    console.error('❌ Failed to parse JSON from AI');
    console.error('❌ Parse Error:', parseError);
    console.error(
      '❌ Content that failed to parse (first 1000 chars):',
      textContent.substring(0, 1000)
    );
    console.error(
      '❌ Content that failed to parse (last 1000 chars):',
      textContent.substring(textContent.length - 1000)
    );

    // Показываем пользователю понятное сообщение
    throw new Error(
      'AI вернул некорректный JSON. Это может быть проблема с Edge Function на Supabase. ' +
        'Проверьте логи Supabase Functions или попробуйте еще раз.'
    );
  }

  return questionsData;
}
