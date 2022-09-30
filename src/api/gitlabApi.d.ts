type toBeDate = string;

export type GitlabProjectURI = `https//:${string}/api/v4/projects/${number}`;
export type category = "commits" | "issues" | "mergeRequests";

export interface GitlabUser {
  id: number;
  username: string;
  name?: string;
  state: "active" | "blocked" | "inactive";
  avatar_url: string | null;
  web_url: string;
}

// "repository/commits"
export interface GitlabCommit {
  id: string;
  short_id: string;
  created_at: string;
  parent_ids: string[];
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date: toBeDate;
  committer_name: string;
  committer_email: string;
  committed_date: toBeDate;
  [key: string]: any;
}

// "merge_requests"
export interface GitlabMergeRequest {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: "opened" | "closed" | "locked" | "merged";
  created_at: toBeDate;
  updated_at: toBeDate;
  merge_user: GitlabUser;
  merged_at: toBeDate;
  closed_by: GitlabUser;
  closed_at: toBeDate;
  target_branch: string;
  source_branch: string;
  user_notes_count: number;
  upvotes: number;
  downvotes: number;
  author: GitlabUser;
  assignees: GitlabUser[];
  assignee: GitlabUser | null;
  reviewers: GitlabUser[];
  source_project_id: number;
  target_project_id: number;
  labels: any[];
  draft: boolean;
  work_in_progress: boolean;
  milestone: string;
  merge_status:
    | "can_be_merged"
    | "cannot_be_merged"
    | "unchecked"
    | "checking"
    | "cannot_be_merged_recheck";
  reference: string;
}

export interface GitlabIssue {
  id: number;
  project_id: number;
  milestone: {};
  author: GitlabUser;
  description: string;
  state: "opened" | "closed" | "locked" | "merged";
  iid: number;
  assignees: GitlabUser[];
  assignee: GitlabUser | null;
  labels: string[];
  upvotes: number;
  downvotes: number;
  merge_requests_count: number;
  title: string;
  updated_at: toBeDate;
  created_at: toBeDate;
  closed_at: toBeDate;
  closed_by: GitlabUser;
  user_notes_count: number;
  due_date: toBeDate; // "31-12-2022" format
  web_url: string;
  references: {
    short: string;
    relative: string;
    full: string;
  };
  has_tasks: boolean;
  confidential: boolean;
}
