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

      providesTags: ["Requests"],
    }),
  }),
});

export const { useGetCancelRequestsQuery } = RequestsApi;
