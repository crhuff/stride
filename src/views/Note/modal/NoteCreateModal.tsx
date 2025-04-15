import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { createNote } from "../../../utils";
import { NewNote, Note } from "../../../utils/api/notes.type";

interface NoteCreateModalProps {
  open: boolean;
  onClose: () => void;
  patientId: string;
  appointmentId: string;
  onDone?: (appointmentId: string) => void;
}

const NoteCreateModal: React.FC<NoteCreateModalProps> = ({
  open,
  onClose,
  onDone,
  patientId,
  appointmentId,
}) => {
  const [newNote, setNewNote] = useState<NewNote>({
    chiefComplaint: "",
    treatmentPlan: "",
    progress: "",
  });
  const [noteFieldTouched, setNoteFieldTouched] = useState({
    chiefComplaint: false,
    treatmentPlan: false,
    progress: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<false | Note>(false);

  const appointmentValid =
    newNote.chiefComplaint && newNote.treatmentPlan && newNote.progress;

  useEffect(() => {
    if (!open) {
      setNewNote({
        chiefComplaint: "",
        treatmentPlan: "",
        progress: "",
      });
      setNoteFieldTouched({
        chiefComplaint: false,
        treatmentPlan: false,
        progress: false,
      });
      setLoading(false);
      setError(null);
      setSuccess(false);
    }
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewNote((prev) => ({ ...prev, [name]: value }));
    setNoteFieldTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await createNote(patientId, appointmentId, newNote);
      if (result.data) setSuccess(result.data);
      if (result.error) throw result.error;
    } catch (err) {
      setError("Failed to create note: " + (err as Error).message);
    }
    setLoading(false);
  };

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
          Create note
        </Typography>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" mb={2}>
            Note created successfully!
          </Typography>
        )}
        {!success && !error && (
          <Stack spacing={2}>
            <TextField
              label="Chief complaint"
              name="chiefComplaint"
              value={newNote.chiefComplaint}
              error={!newNote.chiefComplaint && noteFieldTouched.chiefComplaint}
              helperText={
                !newNote.chiefComplaint && noteFieldTouched.chiefComplaint
                  ? "Chief complaint is required"
                  : ""
              }
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Treatment plan"
              name="treatmentPlan"
              value={newNote.treatmentPlan}
              error={!newNote.treatmentPlan && noteFieldTouched.treatmentPlan}
              helperText={
                !newNote.treatmentPlan && noteFieldTouched.treatmentPlan
                  ? "Treatment plan is required"
                  : ""
              }
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Progress"
              name="progress"
              value={newNote.progress}
              error={!newNote.progress && noteFieldTouched.progress}
              helperText={
                !newNote.progress && noteFieldTouched.progress
                  ? "Progress is required"
                  : ""
              }
              onChange={handleInputChange}
              fullWidth
            />
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!appointmentValid || loading}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default NoteCreateModal;
