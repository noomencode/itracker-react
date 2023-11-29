import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";

const getRandomColor = (usedColors) => {
  const colors = [
    "#009c7a", // Red
    "#009c7a", // Green
    "#FFEB3B", // Yellow
    "#2196F3", // Blue
    // "#FF9800", // Orange
    // "#9C27B0", // Purple
    "#00BCD4", // Cyan
    // "#8BC34A", // Light Green
    "#FFC107", // Amber
    "#607D8B", // Light Blue
  ];
  const availableColors = colors.filter((color) => !usedColors.includes(color));
  const randomIndex = Math.floor(Math.random() * availableColors.length);
  const randomColor = availableColors[randomIndex];

  return randomColor;
};

const generateBar = (sortedArray) => {
  let usedColors = []; // Array to store the used colors

  const result = sortedArray.map((dataObj, i) =>
    Object.keys(dataObj)
      .filter((propName) => {
        return propName !== "name";
      })
      .map((trackName) => {
        if (i === 0) {
          const randomColor = getRandomColor(usedColors); // Get a random color

          usedColors.push(randomColor); // Add the color to the used colors array

          return (
            <Bar
              dataKey={trackName}
              stackId="stack"
              fill={randomColor}
              name={`${trackName}`}
            >
              <LabelList
                dataKey={trackName}
                name={trackName}
                content={renderCustomizedLabel}
              />
            </Bar>
          );
        }
      })
  );

  return result;
};
const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value, name } = props;
  if (value > 5) {
    return (
      <g>
        <foreignObject x={x + 5} y={y - 20} width={"100%"} height={height}>
          <Typography
            variant="span"
            sx={{ fontWeight: 600 }}
          >{`${value}%`}</Typography>
        </foreignObject>
      </g>
    );
  } else {
    return null;
  }
};

function AllocationChart(props) {
  const theme = useTheme();

  const { data } = props;
  return (
    <React.Fragment>
      <Typography variant="h6">{props.title}</Typography>
      <Divider sx={{ mb: 2 }} />
      <ResponsiveContainer width="100%" height={80}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 15,
            left: 15,
            // bottom: 20,
          }}
        >
          <XAxis type="number" domain={[0, 100]} hide={true} />
          <YAxis dataKey="name" type="category" hide={true} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.primary.main,
            }}
            position={{ x: 0, y: -90 }}
          />
          {generateBar(data)}
          <Legend wrapperStyle={{ fontSize: "0.8em" }} />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default AllocationChart;
