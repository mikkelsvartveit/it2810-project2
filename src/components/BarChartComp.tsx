import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";

export type BarData = {
  name: string;
  value: number;
}[];

interface PropType {
  data: BarData;
  width: number;
  height: number;
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

/**
 *
 * @param data name and number of occurrences in a list
 * @param width widht of the chart
 * @param height height of the chart
 * @returns
 */
const BarChartComp = ({ data, width, height }: PropType) => {
  return (
    <BarChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="value" fill={COLORS[0]}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
      <Tooltip />
      <Legend />
    </BarChart>
  );
};
export default BarChartComp;
