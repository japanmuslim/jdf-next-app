import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '@/init/baseQuery';
import { QuestionService } from '../constant';

export const QuestionApi = createApi({
  reducerPath: QuestionService,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getQuestion: builder.query({
      query: (page: number) =>
        `question-and-answer${page ? `?page=${page}` : ''}`,
    }),
    storeQuestion: builder.mutation({
      query: (body) => ({
        url: `question-and-answer/questions`,
        method: 'POST',
        body,
      }),
    }),
    searchQuestion: builder.query({
      query: (search: string) => `question-and-answer/search?search=${search}`,
    }),
  }),
});

export const {
  useGetQuestionQuery,
  useStoreQuestionMutation,
  useSearchQuestionQuery,
} = QuestionApi;
