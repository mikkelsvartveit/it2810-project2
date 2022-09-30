import { useState, useEffect, useContext } from "react";
import { category } from "../api/gitlabApi";
import { RepoContext } from "../App";
import { getTopThree } from "../util/graphHelper";
import { Dropdown, Option } from "./Drowdown";
import { LeaderboardGraph, Winner } from "./LeaderboardGraph";

export const Leaderboard = () => {
  const repoContext = useContext(RepoContext);
  const options: Option<category>[] = [
    {
      value: "commits",
      label: "Commits",
    },
    {
      value: "mergeRequests",
      label: "Merge Requests",
    },
    {
      value: "issues",
      label: "Issues",
    },
  ];
  const [isLoading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<Option<category>>(
    options[0]
  );
  const [topThree, setTopThree] = useState<Winner[] | null>(null);

  useEffect(() => {
    if (!repoContext.repoData.repoURI || !repoContext.repoData.repoToken) {
      return;
    }

    getTopThree(
      selectedOption.value,
      repoContext.repoData.repoToken,
      repoContext.repoData.repoURI
    )
      .then((topThree) => {
        setTopThree(topThree);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedOption, repoContext]);

  return (
    <>
      <div>
        <h1>Leaderboard</h1>
        <Dropdown options={options} onSelectedChange={setSelectedOption} />
      </div>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && topThree?.length === 3 && (
        <LeaderboardGraph winners={topThree} category={selectedOption.label} />
      )}
    </>
  );
};
