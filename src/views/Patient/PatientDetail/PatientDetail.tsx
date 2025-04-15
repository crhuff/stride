import { useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useGetAppointments, useGetPatient } from "../../../utils";
import ErrorNotification from "../../../components/ErrorNotification/ErrorNotification";
import AppointmentTable from "../../Appointment/AppointmentTable";
import { useEffect, useState } from "react";
import AppointmentCreateModal from "../../Appointment/create/AppointmentCreateModal";
import { useHeader } from "../../../utils/header/useHeader";

const PatientDetail = () => {
  const { setBackButtonVisible } = useHeader();

  const patientId = useParams().id as string;
  const patientResponse = useGetPatient(patientId);
  const appointmentsResponse = useGetAppointments(patientId);
  const isLoading = patientResponse.loading;
  const [isModalOpen, setModalOpen] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    setBackButtonVisible(true);
  }, [setBackButtonVisible]);

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
    <div id="patient-detail">
      <Box
        className="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">
          {firstName} {lastName}
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography color="textSecondary">
            Date of Birth: {new Date(dateOfBirth).toLocaleDateString()}
          </Typography>
          <Typography color="textSecondary">Phone: {phoneNumber}</Typography>
          <Typography color="textSecondary">
            Created at: {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Create new Appointment
      </Button>
      <div className="table-container">
        <AppointmentTable
          patientId={patientId}
          refetchTrigger={refetchTrigger}
        />
      </div>
      <AppointmentCreateModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onDone={() => {
          appointmentsResponse.refetch();
          setRefetchTrigger((prev) => prev + 1); // Update refetchTrigger
          setModalOpen(false);
        }}
        patientId={patientId}
      />
    </div>
  );
};

export default PatientDetail;
