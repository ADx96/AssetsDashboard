import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Instance from "./Instance";

export const baseQuery = fetchBaseQuery({
  baseUrl: Instance,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      const jwt =
        "50e22e05f420a5c3b1de820c94ea2509e2de0ad78d8aa6c4c5d72ca636daeecaf5f9debf835237ae7cb6a87ed5ba7379de000c36bfa9f8c42dc1ded70c08b09067f2df9334e76b2d5b9ca2d52860aa19653cfcb0dc043eeed4ddfc2379c807f4c8904ebe79174b8d529e7d3189d516a0084e4aaf2cf5a91bd4ed5d696fb152e5";
      headers.set("authorization", `Bearer ${jwt}`);
    }

    return headers;
  },
});

export const createAppApi = (options) => createApi({ ...options, baseQuery });
