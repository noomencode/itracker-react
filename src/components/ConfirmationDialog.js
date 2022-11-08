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
            <Typography variant="h6" component="h6">
              Are you sure you wish to delete the following assets:
            </Typography>
          </DialogContentText>
          {selectedAssets.map((a) => {
            return (
              <DialogContentText>
                <Typography variant="h6" component="h6" fontWeight={600}>
                  {a.name}
                </Typography>
              </DialogContentText>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button color={"secondary"} onClick={handleDialogClose}>
            <Typography variant="h6" component="h6">
              Cancel
            </Typography>
          </Button>
          <Button color={"secondary"} onClick={handleConfirm} autoFocus>
            <Typography variant="h6" component="h6">
              Confirm
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
