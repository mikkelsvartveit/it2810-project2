import { useEffect, useState } from "react";
import {
  getApiURI,
  getCommits,
  getMergeRequests,
  getIssues,
} from "../api/gitlabApiHelpers";
import type {
  GitlabProjectURI,
  GitlabMergeRequest,
  GitlabCommit,
  GitlabIssue,
} from "../api/gitlabApi";
import BarChartComp, { BarData } from "./BarChartComp";

const PROJECT_LINK =
  "https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-18/prosjekt2";
const ACCESS_TOKEN = "glpat-8o5hy6RmsFsUPhpJVFf-";

export type GraphTypeSelectOptions = "commits" | "issues" | "merge_requests";

const filterData = (
  data: GitlabMergeRequest[] | GitlabCommit[] | GitlabIssue[],
  queryBy: GraphTypeSelectOptions
): BarData => {
  if (queryBy === "commits") {
    const commits = data as GitlabCommit[];
    const commitData: BarData = [];
    commits.forEach((commit) => {
      const author = commit.author_name ?? "Not assigned";
      const index = commitData.findIndex((data) => data.name === author);
      if (index === -1) {
        commitData.push({ name: author, value: 1 });
      } else {
        commitData[index].value += 1;
      }
    });
    console.log(commitData);
    return commitData;
  } else if (queryBy === "issues") {
    const issues = data as GitlabIssue[];
    const issueData: BarData = [];
    issues.forEach((issue) => {
      const author = issue.author ? issue.author.username : "Not assigned";
      const index = issueData.findIndex((data) => data.name === author);
      if (index === -1) {
        issueData.push({ name: author, value: 1 });
      } else {
        issueData[index].value += 1;
      }
    });
    console.log(issueData);
    return issueData;
  } else {
    const mergeRequests = data as GitlabMergeRequest[];
    const mergeRequestData: BarData = [];
    mergeRequests.forEach((mergeRequest) => {
      const author = mergeRequest.author
        ? mergeRequest.author.username
        : "Not assigned";
      const index = mergeRequestData.findIndex((data) => data.name === author);
      if (index === -1) {
        mergeRequestData.push({ name: author, value: 1 });
      } else {
        mergeRequestData[index].value += 1;
      }
    });
    console.log(mergeRequestData);
    return mergeRequestData;
  }
};

const GraphsComp = () => {
  const [queryBy, setQueryBy] =
    useState<GraphTypeSelectOptions>("merge_requests");
  const [data, setData] = useState<
    GitlabMergeRequest[] | GitlabCommit[] | GitlabIssue[]
  >([]);

  useEffect(() => {
    const data = async () => {
      const apiURI = getApiURI(PROJECT_LINK);
      if (!apiURI) {
        setData([]);
        return;
      }
      let qFunc;
      switch (queryBy) {
        case "commits":
          qFunc = getCommits;
          break;
        case "issues":
          qFunc = getIssues;
          break;
        case "merge_requests":
          qFunc = getMergeRequests;
          break;
      }
      setData(
        await qFunc(apiURI, ACCESS_TOKEN).catch((err) => {
          console.error(err);
          return [];
        })
      );
    };
    data();
  }, [queryBy]);

  return (
    <div>
      <div>
        <select
          onChange={(e) => setQueryBy(e.target.value as GraphTypeSelectOptions)}
        >
          <option value="commits">Commits</option>
          <option value="issues">Issues</option>
          <option value="merge_requests">Merge Requests</option>
        </select>
      </div>
      <BarChartComp data={filterData(data, queryBy)} width={500} height={300} />
    </div>
  );
};

export default GraphsComp;
