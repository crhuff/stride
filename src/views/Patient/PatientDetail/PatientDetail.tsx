import { useParams } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { useGetPatient } from "../../../utils";
import ErrorNotification from "../../../components/ErrorNotification/ErrorNotification";

const PatientDetail = () => {
  const patientId = useParams().id as string;
  const patientResponse = useGetPatient(patientId);
  const isLoading = patientResponse.loading;
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Loading...
          </Typography>
        </CardContent>
      </Card>
    );
  }
  if (patientResponse.error) {
    return <ErrorNotification error={patientResponse.error} />;
  }
  if (!patientResponse.data) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Patient not found
          </Typography>
        </CardContent>
      </Card>
    );
  }
  const { firstName, lastName, dateOfBirth, phoneNumber, createdAt } =
    patientResponse.data;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {firstName} {lastName}
        </Typography>
        <Typography color="textSecondary">
          Date of Birth: {new Date(dateOfBirth).toLocaleDateString()}
        </Typography>
        <Typography color="textSecondary">Phone: {phoneNumber}</Typography>
        <Typography color="textSecondary">
          Created at: {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PatientDetail;
