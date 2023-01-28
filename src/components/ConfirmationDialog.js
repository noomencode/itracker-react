import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog(props) {
  const { handleConfirm, handleDialogClose, selectedAssets, dialogOpen } =
    props;

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h6" component="span">
              Are you sure you wish to delete the following assets:
            </Typography>
          </DialogContentText>
          {selectedAssets.map((a, index) => {
            return (
              <DialogContentText key={index}>
                <Typography variant="h6" component="span" fontWeight={600}>
                  {a.name}
                </Typography>
              </DialogContentText>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button color={"secondary"} onClick={handleDialogClose}>
            <Typography variant="h6" component="span">
              Cancel
            </Typography>
          </Button>
          <Button color={"secondary"} onClick={handleConfirm} autoFocus>
            <Typography variant="h6" component="span">
              Confirm
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
