import { createApi } from '@reduxjs/toolkit/query/react';
import { QuizService } from '../constant';
import baseQuery from '@/init/baseQuery';

export const QuizApi = createApi({
  reducerPath: QuizService,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getQuiz: builder.query({
      query: ({ page: number }) => `quizzes?page=${number || 1}`,
    }),
  }),
});

export const { useGetQuizQuery } = QuizApi;
