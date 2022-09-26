import { useState, useEffect } from "react";
import { category } from "../api/gitlabApi";
import { getTopThree } from "../util/graphHelper";
import { Dropdown, Option } from "./Drowdown";
import { LeaderboardGraph, Winner } from "./LeaderboardGraph";

export const Leaderboard = () => {
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
    const repoToken = window.localStorage.getItem("token") || "";
    const repoURI = window.localStorage.getItem("repoURI") || "";
    console.log(repoToken, repoURI);
    getTopThree(selectedOption.value, repoToken, repoURI)
      .then((topThree) => {
        console.log("Here:" + topThree.length);
        setTopThree(topThree);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedOption]);

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
