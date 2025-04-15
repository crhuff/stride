import { useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import {
  useGetAppointment,
  useGetPatients,
  useGetProviders,
} from "../../utils";
import ErrorNotification from "../../components/ErrorNotification/ErrorNotification";
import NoteTable from "../Note/NoteTable";
import { useState } from "react";
import NoteCreateModal from "../Note/NoteCreateModal";

const AppointmentDetail = () => {
  const patientId = useParams().id as string;
  const appointmentId = useParams().appointmentId as string;
  const appointmentResponse = useGetAppointment(patientId, appointmentId);
  const patientsResponse = useGetPatients();
  const providersResponse = useGetProviders();

  const [createNoteModalOpen, setCreateNoteModalOpen] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  if (
    appointmentResponse.error ||
    providersResponse.error ||
    patientsResponse.error
  ) {
    return (
      <ErrorNotification
        error={
          (appointmentResponse.error ||
            providersResponse.error ||
            patientsResponse.error) as Error
        }
      />
    );
  }
  if (
    appointmentResponse.loading ||
    providersResponse.loading ||
    patientsResponse.loading
  ) {
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
  if (!appointmentResponse.data) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Appointment not found
          </Typography>
        </CardContent>
      </Card>
    );
  }
  const { id, providerId, startTime, endTime, type, status, createdAt } =
    appointmentResponse.data;

  const matchingProvider = providersResponse.data?.find(
    ({ id }) => id === providerId,
  );
  const matchingPatient = patientsResponse.data?.find(
    ({ id }) => id === patientId,
  );
  return (
    <div id="appointment-detail">
      <Box
        className="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">
          {(matchingPatient &&
            `${matchingPatient?.firstName} ${matchingPatient?.lastName} - Appointment`) ||
            id ||
            "No patient found"}
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Provider:{" "}
            {(matchingProvider &&
              `${matchingProvider?.firstName} ${matchingProvider?.lastName}`) ||
              id ||
              "No provider found"}
          </Typography>
          <Typography color="textSecondary">
            Date: {new Date(startTime).toLocaleDateString()}
          </Typography>
          <Typography color="textSecondary">
            Time:{" "}
            {new Date(startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {new Date(endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
          <Typography color="textSecondary">Type: {type}</Typography>
          <Typography color="textSecondary">Status: {status}</Typography>
          <Typography color="textSecondary">
            Created At: {new Date(createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateNoteModalOpen(true)}
      >
        Create new Note
      </Button>
      <div className="table-container">
        <NoteTable
          patientId={patientId}
          appointmentId={appointmentId}
          refetchTrigger={refetchTrigger}
        />
      </div>
      <NoteCreateModal
        open={createNoteModalOpen}
        onClose={() => setCreateNoteModalOpen(false)}
        onDone={() => {
          setRefetchTrigger((prev) => prev + 1); // Update refetchTrigger
          setCreateNoteModalOpen(false);
        }}
        patientId={patientId}
        appointmentId={appointmentId}
      />
    </div>
  );
};

export default AppointmentDetail;
