import React from "react";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import { useDispatch } from "react-redux";
import { removeDataAction } from "../actions/portfolioActions";

const Message = (props) => {
  const { severity, message, handleAlert } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    // if (severity === "success") {
    const timeId = setTimeout(() => setOpen(false), 5000);

    return () => {
      clearTimeout(timeId);
    };
    // }
  }, []);

  if (!open) {
    dispatch(removeDataAction());
    return null;
  }
  return (
    <>
      <Collapse in={open} unmountOnExit>
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
