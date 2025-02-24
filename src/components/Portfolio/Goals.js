import React, { useState } from "react";
import { Box, Divider, Typography, CardContent } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import AllocationChart from "./AllocationChart";
import { useTheme } from "@mui/material/styles";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

const Goals = (props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { performance, history, goals } = props;
  const currentYear = new Date().getFullYear();
  const thisYearGoals = goals.find((g) => g.year === currentYear.toString());

  const lastYearHistory = history
    .filter((h) => h.year === currentYear - 1)
    .slice(-1)[0];
  const valueGoal = thisYearGoals.valueGrowth ?? 0;
  const investmentGoal = thisYearGoals.investments ?? 0;
  const valueGoalProgress =
    ((performance.value - lastYearHistory.worth) / valueGoal) * 100;
  const investmentGoalProgress =
    ((performance.expenses - lastYearHistory.expenses) / investmentGoal) * 100;

  const valueGoalString = `${(
    performance.value - lastYearHistory.worth
  ).toFixed(2)} € / ${valueGoal} €`;
  const investmentGoalString = `${(
    performance.expenses - lastYearHistory.expenses
  ).toFixed(2)} € / ${investmentGoal} €`;

  function LinearProgressWithLabel({ value, goalType }) {
    const isValueGoal = goalType === "value";

    return (
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Box sx={{ width: "100%", mr: 1, mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={value}
            color="secondary"
            sx={{ height: "0.8em" }}
          />
          <Typography
            mt={1}
            display="flex"
            justifyContent="center"
            variant="h6"
          >
            {isValueGoal ? valueGoalString : investmentGoalString}
          </Typography>
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {`${Math.round(
              isValueGoal ? valueGoalProgress : investmentGoalProgress
            )}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ margin: "5px" }}>
      {/* <Card sx={{ marginBottom: 1 }}> */}
      <CardContent
        sx={{
          p: 1,
          background: open ? undefined : theme.palette.customGradientBackground,
          borderRadius: "5px",
        }}
      >
        <Typography
          variant="h5"
          color="text.primary"
          gutterBottom
          sx={{ display: "flex" }}
        >
          Portfolio goals
          {open ? (
            <KeyboardDoubleArrowUpIcon
              sx={{ display: "flex", cursor: "pointer" }}
              onClick={() => {
                setOpen(!open);
              }}
            />
          ) : (
            <KeyboardDoubleArrowDownIcon
              sx={{ display: "flex", cursor: "pointer" }}
              onClick={() => {
                setOpen(!open);
              }}
            />
          )}
        </Typography>
      </CardContent>

      {open ? (
        <Box
          sx={{
            background: theme.palette.customGradientBackground,
            p: 2,
            mb: "5px",
            borderRadius: "5px",
          }}
        >
          {/* <Divider sx={{ mb: 1 }} /> */}
          <Typography variant="h6" mb={1}>
            {`Portfolio value increase ${currentYear}`}
          </Typography>
          <LinearProgressWithLabel value={valueGoalProgress} goalType="value" />
          <Typography variant="h6" mb={1}>
            {`Investments ${currentYear}`}
          </Typography>
          <LinearProgressWithLabel
            value={investmentGoalProgress}
            goalType="investment"
          />
        </Box>
      ) : null}
      {/* </Card> */}
    </Box>
  );
};

export default Goals;
