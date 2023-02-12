import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Typography from "@mui/material/Typography";
import { render } from "@testing-library/react";

const data = [
  {
    name: "Region",
    BALTICS: 25,
    USA: 25,
    EUROPE: 50,
  },
];

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value, name } = props;

  console.log("customlabel", props);
  return (
    // <Typography variant="h6">
    <g>
      <foreignObject
        x={x + width / 3}
        y={y + height / 3}
        width={width}
        height={height}
      >
        <Typography variant="span">{`${name} ${value}%`}</Typography>
      </foreignObject>
    </g>
    // </Typography>
  );
};

const renderLabel = (props) => {
  return `${props}%`;
};

function AllocationChart() {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart
        width={400}
        height={150}
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis type="number" domain={[0, 100]} hide={true} />
        <YAxis dataKey="name" type="category" hide={true} />
        {/* <Customized></Customized> */}
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Bar dataKey="BALTICS" stackId="a" fill="#8884d8">
          <LabelList
            dataKey="BALTICS"
            name="Baltics"
            content={renderCustomizedLabel}
            position="middle"
          />
        </Bar>
        <Bar dataKey="EUROPE" stackId="a" fill="#82ca9d">
          <LabelList
            dataKey="EUROPE"
            name="Europe"
            content={renderCustomizedLabel}
            position="middle"
          />
        </Bar>
        <Bar dataKey="USA" stackId="a" fill="#10ca2d">
          <LabelList dataKey="USA" position="middle" formatter={renderLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AllocationChart;
