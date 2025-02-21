import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const user_api = createApi({
  reducerPath: "user_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/user/"
        : "https://sharespace-server.vercel.app/user/"
    }`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("sharespace_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["user", "auth"],
  endpoints: () => ({}),
});

export const roomate_api = createApi({
  reducerPath: "roommate_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/roommates/"
        : "https://sharespace-server.vercel.app/roommates/"
    }`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("sharespace_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["roommates", "chats", "proposals", "match"],
  endpoints: () => ({}),
});

export const credit_api = createApi({
  reducerPath: "credit_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/credit/"
        : "https://sharespace-server.vercel.app/credit/"
    }`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("sharespace_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["credit"],
  endpoints: () => ({}),
});

export const api = createApi({
  reducerPath: "api_reducer_path",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["auth", "space-chat"],
  endpoints: () => ({}),
});
