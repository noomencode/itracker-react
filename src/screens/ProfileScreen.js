import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { changePassword } from "../actions/userActions";
import Message from "../components/Message";

const ProfileScreen = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  const dispatch = useDispatch();

  const { changePwRequest, loading, error } = useSelector(
    (state) => state.userChangePw
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Implement password change logic
    if (newPassword === confirmPassword) {
      try {
        dispatch(changePassword(oldPassword, newPassword));
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {}
    } else {
      setInputError(true);
    }
    // Clear form fields
  };

  const renderMessage = (type) => {
    switch (type) {
      case "success":
        return (
          <Message
            severity="success"
            message="Password changed successfully."
          />
        );
      case "fail":
        return (
          <Message
            severity="error"
            message="Something went wrong. Check your inputs."
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ p: 2, mt: 2 }}>
        <Typography variant="h5">Change password</Typography>
        {changePwRequest?.message?.length ? renderMessage("success") : null}
        {inputError ? renderMessage("fail") : null}

        <Box
          component="form"
          autoComplete="false"
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            id="oldPwField"
            label="Old Password"
            type="password"
            inputProps={{
              autoComplete: "old-password",
            }}
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="newPwField"
            label="New Password"
            type="password"
            inputProps={{
              autoComplete: "new-password-a",
            }}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="newPwFieldAgain"
            label="Confirm New Password"
            type="password"
            inputProps={{
              autoComplete: "new-password-b",
            }}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              ":hover": {
                bgcolor: "secondary.main", // theme.palette.primary.main
                color: "primary.main",
              },
            }}
          >
            Save changes
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default ProfileScreen;
