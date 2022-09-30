import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { AggregateBy } from "./GraphsComp";

export interface BarProp {
  name: string;
  value: number;
  imgUrl?: string;
}

export type BarData = BarProp[];

interface PropType {
  data: BarData;
  width: number;
  aggregateBy: AggregateBy;
}

const COLORS = [
  "#00AE12",
  "#00AE3E",
  "#00AE6F",
  "#00AE9E",
  "#008EAE",
  "#005EAE",
  "#00AE8C",
  "#00A1AE",
  "#0070AE",
  "#0043AE",
  "#0018AE",
  "#1700AE",
];

const colorByIndexAndLength = (index: number, dataLength: number) => {
  //evenly spread colors by index and length of input
  const i = Math.floor((index / dataLength) * COLORS.length);
  return COLORS[i];
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderBarchart = (
  data: BarData,
  width: number,
  orientation: "vertical" | "horizontal"
) => {
  const height = data.length * 90;
  if (orientation === "vertical") {
    return (
      <BarChart
        width={width}
        height={height}
        data={[...data].sort((a, b) => b.value - a.value)}
        layout={"vertical"}
        margin={{ left: 20 }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <YAxis dataKey="name" type="category" />
        <Bar dataKey="value" fill={COLORS[0]} layout="vertical">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorByIndexAndLength(index, data.length)}
            />
          ))}
        </Bar>
        <XAxis dataKey={"value"} type={"number"} />
        <Tooltip />
      </BarChart>
    );
  } else {
    return (
      <BarChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill={COLORS[0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorByIndexAndLength(index, data.length)}
            />
          ))}
        </Bar>
        <Tooltip />
      </BarChart>
    );
  }
};

/**
 *
 * @param data name and number of occurrences in a list
 * @param width widht of the chart
 * @param aggregateBy which charts to render
 * @returns
 */
const BarChartComp = ({ data, width, aggregateBy }: PropType) => {
  // cumulate data into 'other' if under 5% of total value
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const others = data
    .filter((d) => d.value / total < 0.05)
    .reduce((acc, curr) => acc + curr.value, 0);
  if (others > 0) {
    data = data.filter((d) => d.value / total >= 0.05);
    data.push({ name: "Others", value: others });
  }
  return (
    <>
      {aggregateBy === "author" ? (
        <>
          <PieChart width={width} height={400} margin={{ left: 20 }}>
            <Pie
              data={[...data].sort((a, b) => b.value - a.value)}
              dataKey="value"
              fill={COLORS[0]}
              label={renderCustomizedLabel}
              labelLine={false}
              cx="50%"
              cy="50%"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorByIndexAndLength(index, data.length)}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div style={{ width: "100%", height: 50 }}></div>
          {renderBarchart(
            [...data].sort((a, b) => b.value - a.value),
            width,
            "vertical"
          )}
        </>
      ) : width > 720 ? (
        renderBarchart(data, width, "horizontal")
      ) : (
        renderBarchart(data, width, "vertical")
      )}
    </>
  );
};
export default BarChartComp;
