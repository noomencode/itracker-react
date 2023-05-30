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
    "#1D639D",
    "#7BB1D3",
    "#3F95B5",
    "#28739E",
    "#4B9FD1",
    "#7FBFD6",
    "#00708A",
    "#7FBFD6",
    "#00708A",
    "#009DD6",
    "#007AA5",
    "#009EBF",
    "#007FB5",
    "#4F9CBD",
    "#0A2468",
    "#1068A2",
    "#3F91B5",
    "#3F9DBF",
    "#3F95BF",
    "#70B5D1",
    "#3F91A2",
    "#007B9E",
    "#0A5BA5",
    "#7F9DBF",
    "#0A5B91",
    "#0A7FB5",
    "#007091",
    "#0A5BA5",
    "#0A70A5",
    "#0A5B91",
    "#7F95A5",
    "#0A7091",
    "#3F9EBF",
    "#0A70A2",
    "#0A70A5",
    "#0A6891",
    "#7F95A2",
    "#4F91A2",
    "#3F9EBF",
    "#3F9EA5",
    "#3F9EBF",
    "#0A6891",
    "#7FB5BF",
    "#00708A",
    "#0A5BA5",
    "#0A7091",
    "#7FB5A2",
    "#4F9DA2",
    "#3F91A2",
    "#3F9D91",
    "#3F95BF",
    "#7FBF9E",
    "#7F9E91",
    "#0A7FBF",
    "#0A70A2",
    "#7FB5A5",
    "#7FBF91",
    "#0A70A5",
    "#0A5BA5",
    "#7F9E91",
    "#0A5B91",
    "#0A70A5",
    "#7F9D91",
    "#3F9D91",
    "#3F9EBF",
    "#0A7FBF",
    "#0A6891",
    "#0A7091",
    "#7F95A5",
    "#4F9D91",
    "#7FBF91",
    "#7FB5A5",
    "#0A70A2",
    "#7FB5BF",
    "#7F9DA2",
    "#7F9E91",
    "#7FB5A2",
    "#7F9D91",
    "#7FBF9E",
    "#3F95A2",
    "#3F95BF",
    "#7FBF91",
    "#7FB5BF",
    "#7F9E91",
    "#7F9D91",
    "#0A70A5",
    "#3F95A5",
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
      <ResponsiveContainer width="100%" height={75}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 25,
            left: 25,
            bottom: 5,
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
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default AllocationChart;
