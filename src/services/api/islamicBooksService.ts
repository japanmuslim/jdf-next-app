import { createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { IslamicBooksService } from '../constant';
import baseQuery from '@/init/baseQuery';

export const IslamicBooksApi = createApi({
  reducerPath: IslamicBooksService,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCategoryBooks: builder.query({
      query: () => `/islami-books/category`,
    }),
  }),
});

export const { useGetCategoryBooksQuery } = IslamicBooksApi;
