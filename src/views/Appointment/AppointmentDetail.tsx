import { useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import {
  useGetAppointment,
  useGetNotes,
  useGetPatients,
  useGetProviders,
} from "../../utils";
import ErrorNotification from "../../components/ErrorNotification/ErrorNotification";
import NoteTable from "../Note/NoteTable";
import { useState } from "react";
import NoteCreateModal from "../Note/NoteCreateModal";
import NoteEditModal from "../Note/NoteUpdateModal";
import NoteDetailModal from "../Note/NoteDetailModal";

const AppointmentDetail = () => {
  const patientId = useParams().id as string;
  const appointmentId = useParams().appointmentId as string;
  const appointmentResponse = useGetAppointment(patientId, appointmentId);
  const patientsResponse = useGetPatients();
  const notesResponse = useGetNotes(patientId, appointmentId);
  const providersResponse = useGetProviders();

  const [createNoteModalOpen, setCreateNoteModalOpen] = useState(false);
  const [editNoteModalOpen, setEditNoteModalOpen] = useState(false);
  const [noteDetailModalOpen, setNoteDetailModalOpen] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  if (
    appointmentResponse.error ||
    notesResponse.error ||
    providersResponse.error ||
    patientsResponse.error
  ) {
    return (
      <ErrorNotification
        error={
          (appointmentResponse.error ||
            notesResponse.error ||
            providersResponse.error ||
            patientsResponse.error) as Error
        }
      />
    );
  }
  if (
    appointmentResponse.loading ||
    notesResponse.loading ||
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
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Provider:{" "}
            {(matchingProvider &&
              `${matchingProvider?.firstName} ${matchingProvider?.lastName}`) ||
              id ||
              "No provider found"}
          </Typography>
          <Typography variant="h5" component="div">
            Patient:{" "}
            {(matchingPatient &&
              `${matchingPatient?.firstName} ${matchingPatient?.lastName}`) ||
              id ||
              "No patient found"}
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
      {/* <NoteTable
        patientId={patientId}
        appointmentId={appointmentId}
        refetchTrigger={refetchTrigger}
      />
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
      <NoteEditModal
        open={editNoteModalOpen}
        onClose={() => setEditNoteModalOpen(false)}
        onDone={() => {
          setRefetchTrigger((prev) => prev + 1); // Update refetchTrigger
          setEditNoteModalOpen(false);
        }}
        patientId={patientId}
        appointmentId={appointmentId}
      />
      <NoteDetailModal
        open={noteDetailModalOpen}
        onClose={() => setNoteDetailModalOpen(false)}
        onDone={() => {
          setNoteDetailModalOpen(false);
        }}
        patientId={patientId}
        appointmentId={appointmentId}
      /> */}
    </>
  );
};

export default AppointmentDetail;
