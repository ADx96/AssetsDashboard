import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Instance from "./Instance";

export const baseQuery = fetchBaseQuery({
  baseUrl: Instance,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const createAppApi = (options) => createApi({ ...options, baseQuery });
