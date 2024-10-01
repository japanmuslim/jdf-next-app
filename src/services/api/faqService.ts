import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '@/init/baseQuery';
import { FaqService } from '../constant';

export const FaqApi = createApi({
  reducerPath: FaqService,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: (page: number) => `faq${page ? `?page=${page}` : ''}`,
    }),
  }),
});

export const { useGetFaqQuery } = FaqApi;
