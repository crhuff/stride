import React from "react";
import { Alert, AlertTitle } from "@mui/material";

interface ErrorNotificationProps {
  error: Error;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ error }) => {
  return (
    <Alert severity="error">
      <AlertTitle>There was an error...</AlertTitle>
      {error.message}
    </Alert>
  );
};

export default ErrorNotification;
