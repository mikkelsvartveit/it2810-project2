import { useContext, useEffect, useRef, useState } from "react";
import {
  getApiURI,
  getCommits,
  getMergeRequests,
  getIssues,
} from "../api/gitlabApiHelpers";
import type {
  GitlabMergeRequest,
  GitlabCommit,
  GitlabIssue,
} from "../api/gitlabApi";
import BarChartComp, { BarData } from "./BarChartComp";
import { Dropdown, Option } from "./Dropdown";
import { RepoContext } from "../App";

export type ApiResult = GitlabCommit[] | GitlabIssue[] | GitlabMergeRequest[];
export type GraphTypeSelect = "commits" | "issues" | "merge_requests";
export type AggregateBy = "author" | "weekday" | "time_of_day";

const graphTypeOptions: { label: string; value: GraphTypeSelect }[] = [
  { label: "Commits", value: "commits" },
  { label: "Issues", value: "issues" },
  { label: "Merge Requests", value: "merge_requests" },
];

const aggregateByOptions: { label: string; value: AggregateBy }[] = [
  { label: "Author", value: "author" },
  { label: "Weekday", value: "weekday" },
  { label: "Time of day", value: "time_of_day" },
];

const filterData = (
  data: ApiResult,
  queryBy: GraphTypeSelect,
  aggregateBy: AggregateBy
): BarData => {
  if (aggregateBy === "author") return aggregateByAuthor(data, queryBy);
  else if (aggregateBy === "weekday") return aggregateByWeekday(data);
  else if (aggregateBy === "time_of_day") return aggregateByTimeOfDay(data);
  return [];
};

const aggregateByAuthor = (
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

const aggregateByWeekday = (data: ApiResult): BarData => {
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

const aggregateByTimeOfDay = (data: ApiResult): BarData => {
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

const GraphsComp = () => {
  /* Make graph take up entire width of parent */
  const divRef = useRef<null | HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);
  const repoContext = useContext(RepoContext);

  const [preSelectedGraphType, setPreSelectedGraphType] = useState<
    Option<GraphTypeSelect> | undefined
  >(undefined);
  const [preSelectedAggregateDataBy, setPreSelectedAggregateDataBy] = useState<
    Option<AggregateBy> | undefined
  >(undefined);

  useEffect(() => {
    if (sessionStorage.getItem("graphQueryBy")) {
      const queryBy = JSON.parse(sessionStorage.getItem("graphQueryBy") || "");
      setPreSelectedGraphType(queryBy);
      setQueryBy(queryBy.value);
    }

    if (sessionStorage.getItem("graphAggregateDataBy")) {
      const aggregateDataBy = JSON.parse(
        sessionStorage.getItem("graphAggregateDataBy") || ""
      );
      setPreSelectedAggregateDataBy(aggregateDataBy);
      setAggregateDataBy(aggregateDataBy.value);
    }
  }, []);

  useEffect(() => {
    if (divRef.current && divRef.current.parentElement)
      setParentWidth(divRef.current.parentElement.offsetWidth);
    window.addEventListener("resize", () => {
      if (divRef.current && divRef.current.parentElement)
        setParentWidth(divRef.current.parentElement.offsetWidth);
    });
  }, [divRef]);

  const [queryBy, setQueryBy] = useState<GraphTypeSelect>("commits");
  const [aggregateDataBy, setAggregateDataBy] = useState<AggregateBy>("author");
  const [data, setData] = useState<ApiResult>([]);

  useEffect(() => {
    const token = repoContext.repoData.repoToken;
    const uri = repoContext.repoData.repoURI;
    if (!token || !uri) {
      console.error("Missing token or project link");
      return;
    }
    const data = async () => {
      const apiURI = getApiURI(uri);
      if (!apiURI) {
        setData([]);
        return;
      }
      let queryFunc;
      switch (queryBy) {
        case "commits":
          queryFunc = getCommits;
          break;
        case "issues":
          queryFunc = getIssues;
          break;
        case "merge_requests":
          queryFunc = getMergeRequests;
          break;
      }
      setData(
        await queryFunc(apiURI, token).catch((err) => {
          console.error(err);
          return [];
        })
      );
    };
    data();
  }, [queryBy, repoContext]);

  const handleSelectQueryBy = (option: Option<any>) => {
    sessionStorage.setItem("graphQueryBy", JSON.stringify(option));
    setQueryBy(option.value);
  };

  const handleSelectAggregateDataBy = (option: Option<any>) => {
    sessionStorage.setItem("graphAggregateDataBy", JSON.stringify(option));
    setAggregateDataBy(option.value);
  };

  return (
    <div ref={(el) => (el ? (divRef.current = el) : null)}>
      <div style={style.dropdownSection}>
        <span style={style.dropdownSectionSpan}> Get: </span>
        <Dropdown
          options={graphTypeOptions}
          onSelectedChange={handleSelectQueryBy}
          selected={preSelectedGraphType}
        />
        <span style={style.dropdownSectionSpan}> Aggregated by: </span>
        <Dropdown
          options={aggregateByOptions}
          onSelectedChange={handleSelectAggregateDataBy}
          selected={preSelectedAggregateDataBy}
        />
      </div>
      <BarChartComp
        data={filterData(data, queryBy, aggregateDataBy)}
        width={parentWidth}
        height={400}
      />
    </div>
  );
};

const style = {
  dropdownSection: {
    margin: "auto",
    marginBottom: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr, 1fr",
    gridGap: "10px",
    alignItems: "center",
  },
  dropdownSectionSpan: {
    margin: "0 10px",
    fontSize: "18px",
  },
};

export default GraphsComp;
