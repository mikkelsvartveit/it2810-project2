import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export type BarData = Array<{
  name: string;
  value: number;
}>;

type PropType = {
  data: BarData;
  width: number;
  height: number;
};

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
      <Bar dataKey="value" />
      <Tooltip />
      <Legend />
    </BarChart>
  );
};
export default BarChartComp;
