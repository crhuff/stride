import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { updateNote, useGetNote } from "../../../utils";
import { Note } from "../../../utils/api/notes.type";
import ErrorNotification from "../../../components/ErrorNotification/ErrorNotification";

interface NoteUpdateModalProps {
  open: boolean;
  onClose: () => void;
  patientId: string;
  appointmentId: string;
  noteId: string;
  onDone?: (appointmentId: string) => void;
}

const NoteUpdateModal: React.FC<NoteUpdateModalProps> = ({
  open,
  onClose,
  onDone,
  patientId,
  noteId,
  appointmentId,
}) => {
  const noteResponse = useGetNote(patientId, appointmentId, noteId, {
    options: { fetchOnMount: true },
  });
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<false | Note>(false);

  useEffect(() => {
    if (noteResponse.data) {
      setNote(noteResponse.data);
    }
  }, [noteResponse.data]);

  const noteValid =
    note?.chiefComplaint && note?.progress && note?.treatmentPlan;

  useEffect(() => {
    if (!open) {
      setNote(null);
      setLoading(false);
      setError(null);
      setSuccess(false);
    }
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNote((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async () => {
    if (!note) return;
    setLoading(true);
    try {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id: _id,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createdAt: _createdAt,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        appointmentId: _appointmentId,
        ...newNote
      } = note;
      const result = await updateNote(
        patientId,
        appointmentId,
        noteId,
        newNote,
      );
      if (result.data) setSuccess(result.data);
      if (result.error) throw result.error;
    } catch (err) {
      setError("Failed to update note: " + (err as Error).message);
    }
    setLoading(false);
  };

  if (noteResponse.error) {
    return (
      <Modal open={open} onClose={onClose}>
        <ErrorNotification error={noteResponse.error} />
      </Modal>
    );
  }
  if (noteResponse.loading || !note) {
    return (
      <Modal open={open} onClose={onClose}>
        <div>Loading...</div>
      </Modal>
    );
  }
  return (
    <Modal
      open={open}
      onClose={success ? () => onDone?.(success?.id || "") : onClose}
    >
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
        <Typography variant="h6" mb={2}>
          Update note
        </Typography>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" mb={2}>
            Note updated successfully!
          </Typography>
        )}
        {!success && !error && (
          <Stack spacing={2}>
            <TextField
              label="Chief complaint"
              name="chiefComplaint"
              value={note.chiefComplaint}
              error={!note.chiefComplaint}
              helperText={
                !note.chiefComplaint ? "Chief complaint is required" : ""
              }
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Treatment plan"
              name="treatmentPlan"
              value={note.treatmentPlan}
              error={!note.treatmentPlan}
              helperText={
                !note.treatmentPlan ? "Treatment plan is required" : ""
              }
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Progress"
              name="progress"
              value={note.progress}
              error={!note.progress}
              helperText={!note.progress ? "Progress is required" : ""}
              onChange={handleInputChange}
              fullWidth
            />
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!noteValid || loading}
              color="primary"
              variant="contained"
            >
              Update
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default NoteUpdateModal;
