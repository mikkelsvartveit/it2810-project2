import { useEffect, useMemo, useRef, useState } from "react";

import type {
  GitlabMergeRequest,
  GitlabCommit,
  GitlabIssue,
} from "../api/gitlabApi";
import BarChartComp, { BarData } from "./BarChartComp";
import { Dropdown } from "./Drowdown";
import { filterData } from "../util/graphHelper";

export type ApiResult = GitlabCommit[] | GitlabIssue[] | GitlabMergeRequest[];
export type GraphTypeSelect = "commits" | "issues" | "merge_requests";
export type AggregateBy = "author" | "weekday" | "time_of_day";

interface GraphCompProps {
  commits: GitlabCommit[];
  issues: GitlabIssue[];
  mergeRequests: GitlabMergeRequest[];
}

const graphTypeOptions: { label: string; value: GraphTypeSelect }[] = [
  { label: "Commits", value: "commits" },
  { label: "Issues Closed", value: "issues" },
  { label: "Merge Requests", value: "merge_requests" },
];

const aggregateByOptions: { label: string; value: AggregateBy }[] = [
  { label: "Author", value: "author" },
  { label: "Weekday", value: "weekday" },
  { label: "Time of day", value: "time_of_day" },
];

const GraphsComp = ({ commits, issues, mergeRequests }: GraphCompProps) => {
  /* Make graph take up entire width of parent */
  const divRef = useRef<null | HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);

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

  const graphData = useMemo(() => {
    if (queryBy === "commits")
      return filterData(commits, queryBy, aggregateDataBy);
    else if (queryBy === "issues")
      return filterData(issues, queryBy, aggregateDataBy);
    else if (queryBy === "merge_requests")
      return filterData(mergeRequests, queryBy, aggregateDataBy);
    return [];
  }, [queryBy, aggregateDataBy]);

  return (
    <div ref={(el) => (el ? (divRef.current = el) : null)}>
      <div style={style.dropdownSection}>
        <span style={style.dropdownSectionSpan}> Get: </span>
        <Dropdown
          options={graphTypeOptions}
          onSelectedChange={(e) => setQueryBy(e.value)}
        />
        <span style={style.dropdownSectionSpan}> Aggregated by: </span>
        <Dropdown
          options={aggregateByOptions}
          onSelectedChange={(e) => setAggregateDataBy(e.value)}
        />
      </div>
      <BarChartComp
        data={graphData}
        width={parentWidth}
        aggregateBy={aggregateDataBy}
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
