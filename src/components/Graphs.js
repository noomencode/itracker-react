import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Card, CardContent, Typography, Divider } from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const Graphs = () => {
  const { portfolioAssets } = useSelector((state) => state.portfolioList);
  const { assets } = portfolioAssets[0];

  if (assets) {
    var data = assets.map((myAsset) => {
      return {
        name: myAsset.name,
        value: parseFloat(
          (myAsset.sharesAmount * myAsset.asset.price).toFixed(2)
        ),
      };
    });
  }

  const COLORS = [
    "#ff9c6e",
    "#00aad4",
    "#ff5c73",
    "#e9b000",
    "#d9f877",
    "#87fba5",
  ];
  // let renderLabel = function (data) {
  //   return `${data.name} (${parseInt(
  //     (data.value / calculatePortfolio.sum) * 100
  //   )}%)`;
  // };
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
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

  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;

    return (
      <Typography variant="h6" component="h6" sx={{ color: color }}>
        {value}
      </Typography>
    );
  };

  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h5" gutterBottom>
            Portfolio allocation
          </Typography>
          <Divider />
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                dataKey="value"
                cx="50%"
                cy="50%"
                data={data}
                fill="#8884d8"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend formatter={renderColorfulLegendText} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Graphs;
