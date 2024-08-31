import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '@/init/baseQuery';
import { ArticleService } from '../constant';

export const ArticleApi = createApi({
  reducerPath: ArticleService,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: ({ page = 1 }) => `posts?page=${page}`,
    }),
    getArticleBySlug: builder.query({
      query: ({ slug }) => `posts/show/${slug}`,
    }),
    getArticleCategory: builder.query({
      query: () => `category`,
    }),
  }),
});

export const { useGetArticleQuery } = ArticleApi;
