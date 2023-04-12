import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const ProfileScreen = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Implement password change logic
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);

    // Clear form fields
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ p: 2, mt: 2 }}>
        <Typography variant="h5">Change password</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            id="field1"
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            required
            fullWidth
            margin="normal"
            autoComplete="chrome-off"
          />
          <TextField
            id="field2"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            fullWidth
            margin="normal"
            autoComplete="no"
            inputProps={{
              autocomplete: "new-password",
            }}
          />
          <TextField
            id="field3"
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            fullWidth
            margin="normal"
            autoComplete="no"
            inputProps={{
              autocomplete: "new-password",
            }}
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
