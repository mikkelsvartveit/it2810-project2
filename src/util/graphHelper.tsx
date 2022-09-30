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
import { BarData } from "../components/BarChartComp";
import {
  AggregateBy,
  ApiResult,
  GraphTypeSelect,
} from "../components/GraphsComp";
import { Winner } from "../components/LeaderboardGraph";

export const filterData = (
  data: ApiResult,
  queryBy: GraphTypeSelect,
  aggregateBy: AggregateBy
): BarData => {
  if (aggregateBy === "author") return aggregateByAuthor(data, queryBy);
  else if (aggregateBy === "weekday") return aggregateByWeekday(data);
  else if (aggregateBy === "time_of_day") return aggregateByTimeOfDay(data);
  return [];
};

export const aggregateByAuthor = (
  data: GitlabCommit[] | GitlabIssue[] | GitlabMergeRequest[],
  dataType: GraphTypeSelect
): BarData => {
  const returnData: BarData = [];
  data.forEach((post) => {
    let author = "";
    if (dataType === "commits") {
      let post2 = post as GitlabCommit;
      author = post2.author_email
        ? post2.author_email.split("@")[0]
        : "Not assigned";
    } else if (dataType === "merge_requests" || dataType === "issues") {
      let post2 = post as GitlabMergeRequest;
      author = post2.author ? post2.author.username : "Not assigned";
    }
    const index = returnData.findIndex((data) => data.name === author);
    if (index === -1) {
      returnData.push({ name: author, value: 1 });
    } else {
      returnData[index].value += 1;
    }
  });
  return returnData;
};

export const aggregateByWeekday = (data: ApiResult): BarData => {
  const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const toReturn: BarData = [];
  WEEK_DAYS.forEach((day) => {
    toReturn.push({ name: day, value: 0 });
  });
  data.forEach((post) => {
    const date = new Date(post.created_at);
    const weekday = WEEK_DAYS[(date.getDay() + 6) % 7];
    const index = toReturn.findIndex((data) => data.name === weekday);
    if (index === -1) {
      toReturn.push({ name: weekday, value: 1 });
    } else {
      toReturn[index].value += 1;
    }
  });
  return toReturn;
};

export const aggregateByTimeOfDay = (data: ApiResult): BarData => {
  const HOUR_INTERVALS = [4, 8, 12, 16, 20, 24];
  const toReturn: BarData = [];
  HOUR_INTERVALS.forEach((hour) => {
    toReturn.push({ name: `${hour - 4}:00-${hour - 1}:59`, value: 0 });
  });
  data.forEach((post) => {
    const date = new Date(post.created_at);
    const hour = date.getHours();
    const index = HOUR_INTERVALS.findIndex((interval) => interval > hour);
    toReturn[index].value += 1;
  });
  return toReturn;
};
