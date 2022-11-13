import { createAppApi } from "../CreateAppApi";

export const RequestsApi = createAppApi({
  reducerPath: "requests",
  tagTypes: ["Requests"],
  endpoints: (builder) => ({
    getCancelRequests: builder.query({
      query: (data) => ({
        url: "/delete-requests",
        params: data,
        keepUnusedDataFor: 60,
      }),

      providesTags: ["Cancel-Requests"],
    }),
    getMoveRequests: builder.query({
      query: (data) => ({
        url: "/move-requests",
        params: data,
        keepUnusedDataFor: 60,
      }),

      providesTags: ["Move-Requests"],
    }),
  }),
});

export const { useGetCancelRequestsQuery } = RequestsApi;
