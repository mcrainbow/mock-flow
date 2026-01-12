import { http, HttpResponse } from 'msw';

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';

export const userHandler = [
  http.get(`*/rest/v1/users`, ({ request }) => {
    const url = new URL(request.url);
    const { searchParams } = url;
    const uid = searchParams.get('uid')?.split('.')[1] ?? '1';

    if (uid === 'unknownUID') {
      return HttpResponse.json(
        {
          code: 'PGRST116',
          message: 'User not found',
          details: null,
          hint: null,
        },
        { status: 406 }
      );
    }

    return HttpResponse.json({
      id: uid,
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  }),
];
