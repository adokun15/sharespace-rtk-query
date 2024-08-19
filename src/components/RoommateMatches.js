import ModalFullView from "../UI/ModalFullView";
import MatchesList from "./MatchesList";

export default function RoommatesMatch() {
  return (
    <ModalFullView>
      <MatchesList
        list={[
          { matchId: 1 },
          { matchId: 2 },
          { matchId: 3 },
          { matchId: 4 },
          { matchId: 5 },
          { matchId: 6 },
          { matchId: 8 },
          { matchId: 9 },
          { matchId: 10 },
          { matchId: 11 },
          { matchId: 12 },
        ]}
      />
    </ModalFullView>
  );
}
