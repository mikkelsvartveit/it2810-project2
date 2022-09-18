type toBeDate = string;

export type GitlabProjectURI = `https//:${string}/api/v4/projects/${number}`;

export interface GitlabUser {
    id: number;
    username: string;
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

let gitlabProjectIssue = {
    project_id: 4,
    milestone: {
        due_date: null,
        project_id: 4,
        state: "closed",
        description:
            "Rerum est voluptatem provident consequuntur molestias similique ipsum dolor.",
        iid: 3,
        id: 11,
        title: "v3.0",
        created_at: "2016-01-04T15:31:39.788Z",
        updated_at: "2016-01-04T15:31:39.788Z",
    },
    author: {
        state: "active",
        web_url: "https://gitlab.example.com/root",
        avatar_url: null,
        username: "root",
        id: 1,
        name: "Administrator",
    },
    description: "Omnis vero earum sunt corporis dolor et placeat.",
    state: "closed",
    iid: 1,
    assignees: [
        {
            avatar_url: null,
            web_url: "https://gitlab.example.com/lennie",
            state: "active",
            username: "lennie",
            id: 9,
            name: "Dr. Luella Kovacek",
        },
    ],
    assignee: {
        avatar_url: null,
        web_url: "https://gitlab.example.com/lennie",
        state: "active",
        username: "lennie",
        id: 9,
        name: "Dr. Luella Kovacek",
    },
    type: "ISSUE",
    labels: ["foo", "bar"],
    upvotes: 4,
    downvotes: 0,
    merge_requests_count: 0,
    id: 41,
    title: "Ut commodi ullam eos dolores perferendis nihil sunt.",
    updated_at: "2016-01-04T15:31:46.176Z",
    created_at: "2016-01-04T15:31:46.176Z",
    closed_at: "2016-01-05T15:31:46.176Z",
    closed_by: {
        state: "active",
        web_url: "https://gitlab.example.com/root",
        avatar_url: null,
        username: "root",
        id: 1,
        name: "Administrator",
    },
    user_notes_count: 1,
    due_date: "2016-07-22",
    web_url: "http://gitlab.example.com/my-group/my-project/issues/1",
    references: {
        short: "#1",
        relative: "#1",
        full: "my-group/my-project#1",
    },
    time_stats: {
        time_estimate: 0,
        total_time_spent: 0,
        human_time_estimate: null,
        human_total_time_spent: null,
    },
    has_tasks: true,
    task_status: "10 of 15 tasks completed",
    confidential: false,
    discussion_locked: false,
    issue_type: "issue",
    severity: "UNKNOWN",
    _links: {
        self: "http://gitlab.example.com/api/v4/projects/4/issues/41",
        notes: "http://gitlab.example.com/api/v4/projects/4/issues/41/notes",
        award_emoji:
            "http://gitlab.example.com/api/v4/projects/4/issues/41/award_emoji",
        project: "http://gitlab.example.com/api/v4/projects/4",
        closed_as_duplicate_of:
            "http://gitlab.example.com/api/v4/projects/1/issues/75",
    },
    task_completion_status: {
        count: 0,
        completed_count: 0,
    },
};

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
    due_date: toBeDate;
    web_url: string;
    references: {
        short: string;
        relative: string;
        full: string;
    };
    has_tasks: boolean;
    confidential: boolean;
}
