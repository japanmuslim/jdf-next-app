import { createApi } from '@reduxjs/toolkit/query/react';
import { HomeService } from '../constant';
import baseQuery from '@/init/baseQuery';

export const HomeApi = createApi({
  reducerPath: HomeService,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCategoryVideo: builder.query({
      query: (category?: string) => `/video/video-categories/${category || ''}`,
    }),
    getVideo: builder.query({
      query: (id: number) => `/video/video-categories/${id || 0}`,
    }),
  }),
});

export const { useGetCategoryVideoQuery, useGetVideoQuery } = HomeApi;
