import { createAppApi } from "../CreateAppApi";

export const AuthApi = createAppApi({
  reducerPath: "authApi",
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/local",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = AuthApi;
