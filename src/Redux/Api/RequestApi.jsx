import { createAppApi } from "../CreateAppApi";

export const RequestsApi = createAppApi({
  reducerPath: "requests",
  tagTypes: ["Delete", "Move"],
  endpoints: (builder) => ({
    getCancelRequests: builder.query({
      query: (data) => ({
        url: "/delete-requests",
        params: data,
      }),
      providesTags: ["Delete"],
    }),
    getMoveRequests: builder.query({
      query: (data) => ({
        url: "/move-requests",
        params: data,
      }),
      providesTags: ["Move"],
    }),
  }),
});

export const { useGetCancelRequestsQuery, useGetMoveRequestsQuery } =
  RequestsApi;
