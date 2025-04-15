import { Box, Card, CardContent, Modal, Typography } from "@mui/material";
import { useGetNote } from "../../utils";
import ErrorNotification from "../../components/ErrorNotification/ErrorNotification";
import { Note } from "../../utils/api/notes.type";

const NoteDetailModal = ({
  open,
  appointmentId,
  patientId,
  noteId,
  onClose,
}: {
  open: boolean;
  appointmentId: string;
  patientId: string;
  noteId: string;
  onClose: () => void;
}) => {
  const noteDetailsResponse = useGetNote(patientId, appointmentId, noteId, {
    options: { fetchOnMount: true },
  });

  if (noteDetailsResponse.error) {
    return (
      <Modal open={open} onClose={onClose}>
        <ErrorNotification error={noteDetailsResponse.error} />
      </Modal>
    );
  }
  if (noteDetailsResponse.loading) {
    return (
      <Modal open={open} onClose={onClose}>
        <div>Loading...</div>
      </Modal>
    );
  }
  const { chiefComplaint, progress, treatmentPlan, createdAt } =
    (noteDetailsResponse.data || {}) as Note;
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Note
            </Typography>
            <Typography color="textSecondary">
              Chief complaint: {chiefComplaint}
            </Typography>
            <Typography color="textSecondary">Progress: {progress}</Typography>
            <Typography color="textSecondary">
              Treatment Plan: {treatmentPlan}
            </Typography>
            <Typography color="textSecondary">
              Created At: {new Date(createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
export default NoteDetailModal;
