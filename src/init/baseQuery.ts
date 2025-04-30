import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL ??
    'https://admin.xn--eckzbvg9a9f.jp/api/v1/',
});

export default baseQuery;
