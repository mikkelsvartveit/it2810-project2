import type {
  GitlabProjectURI,
  GitlabMergeRequest,
  GitlabCommit,
  GitlabIssue,
} from "./gitlabApi";
const API_V4_PROJECTS = "/api/v4/projects";
const ENCODED_BACKSLASH = "%2F";

export const getApiURI = (projectLink: string) => {
  // return null if projectLink is not a valid Gitlab link
  if (!projectLink.match(/https:\/\/.*gitlab\..*?\/.+/g)) return null;

  const regex = /(https:\/\/.*gitlab\..*?)\/(.*)/g;
  const match = projectLink.matchAll(regex);
  let temp = match.next().value as RegExpMatchArray;
  const URI = temp[1];
  let id = temp[2];
  id = id.replace(/\//g, ENCODED_BACKSLASH);

  return `${URI}${API_V4_PROJECTS}/${id}` as GitlabProjectURI;
};

export const fetchRequestWithToken = async (
  url: string,
  token: string,
  method?: "GET" | "POST" | "PUT" | "DELETE",
  body?: any
) => {
  return await fetch(url, {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};

/* GET /projects/:id/merge_requests */
export const getMergeRequests = async (
  projectURI: GitlabProjectURI,
  accessToken: string,
  state?: "opened" | "closed" | "locked" | "all"
) => {
  const uri = `${projectURI}/merge_requests?state=${state || "all"}`;
  const fetched = await fetchRequestWithToken(uri, accessToken);

  if (fetched.status !== 200) {
    console.error({ uri, accessToken, state, fetched });
    throw new Error(
      `Error fetching merge requests: ${fetched.statusText} (${fetched.status})`
    );
  }
  return (await fetched.json()) as GitlabMergeRequest[];
};

/* GET /projects/:id/repository/commits */
export const getCommits = async (
  projectURI: GitlabProjectURI,
  accessToken: string
) => {
  const uri = `${projectURI}/repository/commits?all=true&per_page=10000`;
  const fetched = await fetchRequestWithToken(uri, accessToken);

  if (fetched.status !== 200) {
    console.error({ uri, accessToken, fetched });
    throw new Error(
      `Error fetching commits: ${fetched.statusText} (${fetched.status})`
    );
  }
  return (await fetched.json()) as GitlabCommit[];
};

// GET /projects/:id/issues
export const getIssues = async (
  projectURI: GitlabProjectURI,
  accessToken: string,
  state?: "opened" | "closed"
) => {
  let uri = `${projectURI}/issues`;
  if (state) uri += `?state=${state}`;
  const fetched = await fetchRequestWithToken(uri, accessToken);

  if (fetched.status !== 200) {
    console.error({ uri, accessToken, state, fetched });
    throw new Error(
      `Error fetching issues: ${fetched.statusText} (${fetched.status})`
    );
  }
  return (await fetched.json()) as GitlabIssue[];
};
