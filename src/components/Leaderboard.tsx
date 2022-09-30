import { useState, useEffect, useContext, useMemo } from "react";
import {
  category,
  GitlabCommit,
  GitlabIssue,
  GitlabMergeRequest,
} from "../api/gitlabApi";
import { RepoContext } from "../App";
import { aggregateByAuthor } from "../util/graphHelper";
import { BarData } from "./BarChartComp";
import { Dropdown, Option } from "./Drowdown";
import { LeaderboardGraph, Winner } from "./LeaderboardGraph";

interface LeaderboardCompProps {
  commits: GitlabCommit[];
  issues: GitlabIssue[];
  mergeRequests: GitlabMergeRequest[];
}

export const Leaderboard = ({
  commits,
  issues,
  mergeRequests,
}: LeaderboardCompProps) => {
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

  const topThree = useMemo(() => {
    let toReturn: BarData = [];
    if (selectedOption.value === "commits")
      toReturn = aggregateByAuthor(commits, "commits");
    else if (selectedOption.value === "issues")
      toReturn = aggregateByAuthor(issues, "issues");
    else if (selectedOption.value === "mergeRequests")
      toReturn = aggregateByAuthor(mergeRequests, "merge_requests");
    if (toReturn.length > 0) {
      toReturn.sort((a, b) => a.value - b.value);
      console.log("que");
      setLoading(false);
      return toReturn.splice(-3);
    }
    return [];
  }, [selectedOption, commits, issues, mergeRequests]);

  return (
    <>
      <div className="filter-container">
        <span>Order by: </span>
        <Dropdown options={options} onSelectedChange={setSelectedOption} />
      </div>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && topThree?.length === 3 && (
        <LeaderboardGraph winners={topThree} category={selectedOption.label} />
      )}
    </>
  );
};
