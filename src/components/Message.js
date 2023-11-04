import React from "react";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";

const Message = (props) => {
  const { severity, message, handleAlert } = props;
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    if (severity === "success") {
      setTimeout(() => setOpen(false), 5000);
    }
  }, [severity]);
  return (
    <>
      <Collapse in={open}>
        <Alert
          severity={severity}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Typography variant="h6" component="span">
            {message}
          </Typography>
        </Alert>
      </Collapse>
    </>
  );
};

export default Message;
