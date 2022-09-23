import React from "react";
import {
  GitlabCommit,
  GitlabIssue,
  GitlabMergeRequest,
} from "../api/gitlabApi";

interface leaderboardProps {
  ranking?: "commits" | "mergeRequests" | "issues",
  commits?: GitlabCommit[],
  issues?: GitlabIssue[],
  mergeRequests?: GitlabMergeRequest[]
}

function getCommitsPerUser(commits: GitlabCommit[]) {
  let userCommitsMap = new Map<string, number>();
  for (let commit of commits) {
    let nrCommits: number | undefined = userCommitsMap.get(commit.author_name);
    if (nrCommits === undefined) {
      userCommitsMap.set(commit.author_name, 1);
    } else {
      userCommitsMap.set(commit.author_name, nrCommits + 1);
    }
  }
  return userCommitsMap;
}

function getMergeRequestsPerUser(mergeRequests: GitlabMergeRequest[]) {
  let userMergeRequestMap = new Map<string, number>();
  for (let mergeRequest of mergeRequests) {
    let nrMergeRequest: number | undefined = userMergeRequestMap.get(
      mergeRequest.author.username
    );
    if (nrMergeRequest === undefined) {
      userMergeRequestMap.set(mergeRequest.author.username, 1);
    } else {
      userMergeRequestMap.set(mergeRequest.author.username, nrMergeRequest + 1);
    }
  }
  return userMergeRequestMap;
}

function getIssuesPerUser(issues: GitlabIssue[]) {
    let userIssueMap = new Map<string, number>();
    for (let issue of issues) {
      let nrIssues: number | undefined = userIssueMap.get(
        issue.closed_by.username
      );
      if (nrIssues === undefined) {
        userIssueMap.set(issue.closed_by.username, 1);
      } else {
        userIssueMap.set(issue.closed_by.username, nrIssues + 1);
      }
    }
    return userIssueMap;
  }

function getSortedMatrix(userInstancesMap: Map<string, number>) {
  const sortedInstancesMatrix = new Array<[string, number]>();
  userInstancesMap.forEach((value, key) => {
    sortedInstancesMatrix.push([key, value]);
  });

  for (let i = 1; i < sortedInstancesMatrix.length - 1; i++) {
    for (let k = 0; k < sortedInstancesMatrix.length - 1; k++) {
      if (sortedInstancesMatrix[k][1] < sortedInstancesMatrix[k + 1][1]) {
        let temp = sortedInstancesMatrix[i];
        sortedInstancesMatrix[k] = sortedInstancesMatrix[k + 1];
        sortedInstancesMatrix[k + 1] = temp;
      }
    }
  }
  return sortedInstancesMatrix;
}

export const Leaderboard = (props:leaderboardProps) => {
  if (props.ranking === "commits" && props.commits) {
    return <p>{getSortedMatrix(getCommitsPerUser(props.commits))};</p>;
  }
  else if (props.ranking === "mergeRequests" && props.mergeRequests) {
    return <p>{getSortedMatrix(getMergeRequestsPerUser(props.mergeRequests))};</p>;
  }
  else if (props.ranking === "issues" && props.issues) {
    return <p>{getSortedMatrix(getIssuesPerUser(props.issues))};</p>;
  } else {
    return <p>Something went wrong, sorry about that</p>
  }
};
