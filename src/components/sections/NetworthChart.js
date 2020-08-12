import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";
import { scaleTime } from "d3-scale";
import { timeMonth } from "d3-time";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

const filterData = (value) => {
  if (
    dayjs(value.traded_on, "DD-MM-YYYY").isBetween("2019-02-02", "2020-02-01")
  ) {
    value.traded_on_unix = dayjs(value.traded_on, "DD-MM-YYYY").valueOf();
    return value;
  }
};

const formatXAxis = (tickItem) => {
  return dayjs(tickItem).format("MMM-YY");
};

export default function NetworthChart({ data }) {
  const slicedData = data.filter(filterData);
  slicedData.reverse();
  const domainXAxis = scaleTime().domain([
    dayjs("01-02-2019", "DD-MM-YYYY").valueOf(),
    dayjs("01-02-2020", "DD-MM-YYYY").valueOf(),
  ]);
  const ticks = domainXAxis.ticks(timeMonth.every(1));

  return (
    <LineChart
      width={900}
      height={500}
      data={slicedData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="traded_on_unix"
        ticks={ticks}
        tickFormatter={formatXAxis}
        domain={domainXAxis}
        padding={{ left: 30, right: 30 }}
        type="number"
      />
      <YAxis
        type="number"
        domain={[21000000, 23000000]}
        tickFormatter={(tickItem) => tickItem / 1000000}
        padding={{ bottom: 20 }}
        name="Networth"
        label={{
          value: "Networth in Millions",
          offset: 0,
          position: "insideLeft",
          angle: "-90",
          fill: "#171923",
        }}
      />
      <Tooltip
        labelStyle={{ color: "#805AD5" }}
        labelFormatter={(value) => {
          return dayjs(value).format("DD/MM/YYYY");
        }}
      />
      <Line
        type="monotone"
        name="Networth"
        dataKey="net_worth"
        stroke="#8884d8"
        dot={false}
      />
    </LineChart>
  );
}
