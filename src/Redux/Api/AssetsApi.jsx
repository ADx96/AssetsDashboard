import { createAppApi } from "../CreateAppApi";

export const AssetsApi = createAppApi({
  reducerPath: "assets",
  tagTypes: ["Assets"],
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: (query) => ({
        url: "/assets",
        params: query,
        keepUnusedDataFor: 60,
      }),

      providesTags: ["Assets"],
    }),
    createAsset: builder.mutation({
      query: (data) => ({
        url: "/assets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Assets"],
    }),
    updateAsset: builder.mutation({
      query: (data) => ({
        url: `/assets/${data.id}`,
        method: "UPDATE",
        body: data,
      }),
      invalidatesTags: ["Assets"],
    }),
    deleteAsset: builder.mutation({
      query: (id) => ({
        url: `/assets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assets"],
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
} = AssetsApi;
