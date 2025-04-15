import { useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useGetAppointments, useGetPatient } from "../../../utils";
import ErrorNotification from "../../../components/ErrorNotification/ErrorNotification";
import PatientAppointmentTable from "./PatientAppointmentTable";
import { useState } from "react";
import AppointmentCreateModal from "../../Appointment/create/AppointmentCreateModal";

const PatientDetail = () => {
  const patientId = useParams().id as string;
  const patientResponse = useGetPatient(patientId);
  const appointmentsResponse = useGetAppointments(patientId);
  const isLoading = patientResponse.loading;
  const [isModalOpen, setModalOpen] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

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
    <>
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Create new Appointment
      </Button>
      <PatientAppointmentTable
        patientId={patientId}
        refetchTrigger={refetchTrigger}
      />
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
    </>
  );
};

export default PatientDetail;
