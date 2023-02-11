import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const Allocation = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Card sx={{ marginBottom: 1 }}>
        <CardContent>
          <Typography
            variant="h5"
            color="text.primary"
            gutterBottom
            sx={{ display: "flex" }}
          >
            Portfolio allocation
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
          {open ? <Divider sx={{ mb: 1 }} /> : null}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Allocation;
