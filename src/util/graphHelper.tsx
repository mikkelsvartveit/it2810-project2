import {
  category,
  GitlabCommit,
  GitlabIssue,
  GitlabMergeRequest,
} from "../api/gitlabApi";
import {
  getApiURI,
  getCommits,
  getIssues,
  getMergeRequests,
} from "../api/gitlabApiHelpers";
import { Winner } from "../components/LeaderboardGraph";

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
export const getTopThree = async (
  category: category,
  token: string,
  repoURI: string
) => {
  const topThree: Winner[] = [];
  const apiURI = getApiURI(repoURI);
  if (apiURI) {
    if (category === "commits") {
      await getCommits(apiURI, token).then((commits) => {
        const commitsPerUser = getCommitsPerUser(commits);
        const sortedCommitsMatrix = getSortedMatrix(commitsPerUser);
        for (let i = 0; i < 3; i++) {
          topThree.push({
            name: sortedCommitsMatrix[i][0],
            value: sortedCommitsMatrix[i][1],
          });
        }
      });
    } else if (category === "mergeRequests") {
      await getMergeRequests(apiURI, token).then((mergeRequests) => {
        const mergeRequestsPerUser = getMergeRequestsPerUser(mergeRequests);
        const sortedMergeRequestsMatrix = getSortedMatrix(mergeRequestsPerUser);
        for (let i = 0; i < 3; i++) {
          topThree.push({
            name: sortedMergeRequestsMatrix[i][0],
            value: sortedMergeRequestsMatrix[i][1],
          });
        }
      });
    } else if (category === "issues") {
      await getIssues(apiURI, token).then((issues) => {
        const issuesPerUser = getIssuesPerUser(issues);
        const sortedIssuesMatrix = getSortedMatrix(issuesPerUser);
        for (let i = 0; i < 3; i++) {
          topThree.push({
            name: sortedIssuesMatrix[i][0],
            value: sortedIssuesMatrix[i][1],
          });
        }
      });
    }
  }
  console.log(topThree);

  return topThree;
};
