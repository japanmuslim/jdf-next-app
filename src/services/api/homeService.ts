import { createApi, FetchArgs, skipToken } from '@reduxjs/toolkit/query/react';
import { HomeService } from '../constant';
import baseQuery from '@/init/baseQuery';

export const HomeApi = createApi({
  reducerPath: HomeService,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCategoryVideo: builder.query({
      query: (category: string) => `/video/video-categories/${category}`,
    }),
    getVideo: builder.query({
      query: (id: number) =>
        id ? `/video/video-categories/${id}` : ({ url: '' } as FetchArgs),
    }),
  }),
});

export const { useGetCategoryVideoQuery, useGetVideoQuery } = HomeApi;
