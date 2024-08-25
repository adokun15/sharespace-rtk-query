import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api_reducer_path",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User", "Profile", "Space", "Preference"],
  endpoints: () => ({}),
});
