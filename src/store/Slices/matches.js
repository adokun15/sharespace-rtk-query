import { getMultipleMatches } from "../../firebase/GetMultipleDocuments";
import { DbError } from "../../utils/ErrorHandlers";
import { ScoresReport } from "../../utils/ScoresHandler";
import { api } from "../api";
const MatchLogicSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    findRoomateMatch: builder.query({
      async queryFn({ uid, formDetails }) {
        try {
          // Get Users
          const matches = await getMultipleMatches(uid);

          //check if user in already added to space;

          //Rate Users and sort User
          const redefinedUsers = ScoresReport(formDetails, matches);
          //
          return { data: redefinedUsers };
        } catch (e) {
          throw new DbError(e?.message);
        }
      },
      providesTags: (results, error, arg) =>
        results
          ? [
              ...results.map(({ data }) => [{ type: "match", id: data?.uid }]),
              { type: "match", id: "MATCHLIST" },
            ]
          : [{ type: "match", id: "MATCHLIST" }],
    }),
  }),
});

export const { useFindRoomateMatchQuery } = MatchLogicSlice;
