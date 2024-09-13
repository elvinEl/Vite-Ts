import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TopProductsType } from "../../types/Types";
export const fakeApi = createApi({
  reducerPath: "fakeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => `products/categories`,
    }),
    getProducts: builder.query<TopProductsType[], void>({
      query: () => `products`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsQuery } = fakeApi;
