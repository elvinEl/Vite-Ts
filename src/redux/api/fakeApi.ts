import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fakeApi = createApi({
  reducerPath: "fakeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => `products/categories`,
    }),
  }),
});

export const { useGetCategoriesQuery } = fakeApi;
