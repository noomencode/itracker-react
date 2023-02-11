import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Region",
    BALTICS: 25,
    USA: 25,
    EUROPE: 50,
  },
];

function AllocationChart() {
  return (
    <ResponsiveContainer width="100%" height="400px">
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
        {/* <Tooltip /> */}
        <Legend />
        <Bar dataKey="BALTICS" stackId="a" fill="#8884d8" />
        <Bar dataKey="EUROPE" stackId="a" fill="#82ca9d" />
        <Bar dataKey="USA" stackId="a" fill="#10ca2d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AllocationChart;
