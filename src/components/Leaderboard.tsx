import { useState, useEffect, useMemo } from "react";
import {
  category,
  GitlabCommit,
  GitlabIssue,
  GitlabMergeRequest,
} from "../api/gitlabApi";
import { aggregateByAuthor } from "../util/graphHelper";
import { BarData } from "./BarChartComp";
import { Dropdown, Option } from "./Dropdown";
import { LeaderboardGraph } from "./LeaderboardGraph";

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
  const options: Option<category>[] = [
    {
      value: "issues",
      label: "Issues Closed",
    },
    {
      value: "mergeRequests",
      label: "Merge Requests",
    },
    {
      value: "commits",
      label: "Commits",
    },
  ];

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
      return toReturn.splice(-3);
    }
    return [];
  }, [selectedOption, commits, issues, mergeRequests]);

  useEffect(() => {
    if (sessionStorage.getItem("leaderboardOrderBy")) {
      setSelectedOption(
        JSON.parse(sessionStorage.getItem("leaderboardOrderBy") || "")
      );
    }
  }, []);
  const handleSelect = (option: Option<category>) => {
    setSelectedOption(option);
    sessionStorage.setItem("leaderboardOrderBy", JSON.stringify(option));
  };

  return (
    <>
      <div className="filter-container">
        <span>Order by: </span>
        <Dropdown
          options={options}
          onSelectedChange={handleSelect}
          selected={selectedOption}
        />
      </div>
      {topThree?.length === 3 ? (
        <LeaderboardGraph winners={topThree} category={selectedOption.label} />
      ) : (
        <>
          <h3>Not enough contributions!</h3>
          <p>
            You need at least three contributors to display the leader podium.
          </p>
        </>
      )}
    </>
  );
};
