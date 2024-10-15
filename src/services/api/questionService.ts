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
    getQuestionById: builder.query({
      query: (id: number) => `question-and-answer/${id}/views`,
    }),
    // getViewQuestion: builder.query({
    //   query: (id: number) => `question-and-answer/${id}/views`,
    // }),
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
    getHotQuestion: builder.query({
      query: () => `question-and-answer/hot-questions`,
    }),
  }),
});

export const {
  useGetQuestionQuery,
  useGetQuestionByIdQuery,
  // useGetViewQuestionQuery,
  useGetHotQuestionQuery,
  useStoreQuestionMutation,
  useSearchQuestionQuery,
} = QuestionApi;
