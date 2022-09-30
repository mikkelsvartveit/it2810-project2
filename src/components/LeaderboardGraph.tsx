import { ReactComponent as First } from "../assets/medals/1place-medal.svg";
import { ReactComponent as Second } from "../assets/medals/2place-medal.svg";
import { ReactComponent as Third } from "../assets/medals/3place-medal.svg";
import PersonImage from "../assets/person.png";
import { BarData } from "./BarChartComp";

export interface LeaderboardGraphProps {
  category: string;
  winners: BarData;
}

export const LeaderboardGraph = ({
  category,
  winners,
}: LeaderboardGraphProps) => {
  //sort the winners by value and switch 1st and 2nd place
  winners.sort((a, b) => b.value - a.value);
  const first = winners[0];
  winners[0] = winners[1];
  winners[1] = first;

  const MAX_BAR_BONUS_HEIGHT = 200;
  const MIN_BAR_HEIGHT = 100;

  const data = winners.map((winner, key) => {
    return (
      <div className="leaderboard winner" key={key} data-testid={key}>
        <img
          className="leaderboard image"
          src={winner.imgUrl || PersonImage}
          alt="winner"
        />
        <div className="leaderboard name">{winner.name}</div>
        <div className="leaderboard score">{winner.value + " " + category}</div>
        <div
          className="podium"
          style={{
            height:
              MIN_BAR_HEIGHT +
              (MAX_BAR_BONUS_HEIGHT * winner.value) / first.value,
          }}
        >
          {key === 0 && (
            <Second style={{ width: MIN_BAR_HEIGHT, height: MIN_BAR_HEIGHT }} />
          )}
          {key === 2 && (
            <Third style={{ width: MIN_BAR_HEIGHT, height: MIN_BAR_HEIGHT }} />
          )}
          {key === 1 && (
            <First style={{ width: MIN_BAR_HEIGHT, height: MIN_BAR_HEIGHT }} />
          )}
        </div>
      </div>
    );
  });

  return <div className="leaderboard container">{data}</div>;
};
