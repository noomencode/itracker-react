import React from "react";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

const Message = (props) => {
  const { severity, message } = props;
  return (
    <>
      <Alert severity={severity} onClose={() => {}}>
        <Typography variant="h6" component="span">
          {message}
        </Typography>
      </Alert>
    </>
  );
};

export default Message;
