import { ReactComponent as First } from "../assets/medals/1place-medal.svg";
import { ReactComponent as Second } from "../assets/medals/2place-medal.svg";
import { ReactComponent as Third } from "../assets/medals/3place-medal.svg";

export interface LeaderboardGraphProps {
  category: string;
  winners: Array<Winner>;
}
export interface Winner {
  imageUrl?: string;
  name: string;
  value: number;
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
  const MIN_BAR_HEIGHT = 130;

  const data = winners.map((winner, key) => {
    const imgPath = "../assets/medals/" + key + "place-medal.svg";
    return (
      <div className="leaderboard winner" key={key}>
        <img
          className="leaderboard image"
          src={winner.imageUrl || "https://picsum.photos/200"}
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
          {key === 0 && <Second />}
          {key === 1 && <First />}
          {key === 2 && <Third />}
        </div>
      </div>
    );
  });

  return <div className="leaderboard container">{data}</div>;
};
