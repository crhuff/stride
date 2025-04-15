import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import {
  Appointment,
  NewAppointment,
} from "../../../utils/api/appointments.type";
import { createAppointment, useGetProviders } from "../../../utils";
import ErrorNotification from "../../../components/ErrorNotification/ErrorNotification";
import { appointmentStatus, appointmentType } from "../../../utils/enums";

interface AppointmentCreateModalProps {
  open: boolean;
  onClose: () => void;
  patientId: string;
  onDone?: (appointmentId: string) => void;
}

const AppointmentCreateModal: React.FC<AppointmentCreateModalProps> = ({
  open,
  onClose,
  onDone,
  patientId,
}) => {
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    providerId: "",
    startTime: "",
    endTime: "",
    status: appointmentStatus.SCHEDULED,
    type: appointmentType.INITIALEVALUATION,
  });
  const [appointmentFieldTouched, setAppointmentFieldTouched] = useState({
    providerId: false,
    startTime: false,
    endTime: false,
    status: false,
    type: false,
  });
  const providersResponse = useGetProviders();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<false | Appointment>(false);

  const appointmentValid =
    newAppointment.startTime &&
    newAppointment.endTime &&
    newAppointment.status &&
    newAppointment.type;

  useEffect(() => {
    if (!open) {
      setNewAppointment({
        providerId: "",
        startTime: "",
        endTime: "",
        status: appointmentStatus.SCHEDULED,
        type: appointmentType.INITIALEVALUATION,
      });
      setAppointmentFieldTouched({
        providerId: false,
        startTime: false,
        endTime: false,
        status: false,
        type: false,
      });
      setLoading(false);
      setError(null);
      setSuccess(false);
    }
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
    setAppointmentFieldTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await createAppointment(patientId, newAppointment);
      if (result.data) setSuccess(result.data);
      if (result.error) throw result.error;
    } catch (err) {
      setError("Failed to create appointment: " + (err as Error).message);
    }
    setLoading(false);
  };
  if (providersResponse.loading) {
    return (
      <Modal open={open} onClose={onClose}>
        <div>Loading...</div>
      </Modal>
    );
  }
  if (providersResponse.error) {
    return (
      <Modal open={open} onClose={onClose}>
        <ErrorNotification error={providersResponse.error} />
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
          Create Appointment
        </Typography>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" mb={2}>
            Appointment created successfully!
          </Typography>
        )}
        {!success && !error && (
          <Stack spacing={2}>
            <TextField
              label="Provider"
              name="providerId"
              select
              fullWidth
              margin="normal"
              value={newAppointment.providerId}
              onChange={handleInputChange}
              error={
                !newAppointment.providerId && appointmentFieldTouched.providerId
              }
              helperText={
                !newAppointment.providerId && appointmentFieldTouched.providerId
                  ? "Provider is required"
                  : ""
              }
            >
              {providersResponse.data?.map(({ id, firstName, lastName }) => (
                <MenuItem key={id} value={id}>
                  {`${firstName} ${lastName}`}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Start Date & Time"
              type="datetime-local"
              name="startTime"
              fullWidth
              value={newAppointment.startTime}
              onChange={handleInputChange}
              error={
                !newAppointment.startTime && appointmentFieldTouched.startTime
              }
              helperText={
                !newAppointment.startTime && appointmentFieldTouched.startTime
                  ? "Start date and time are required"
                  : ""
              }
            />
            <TextField
              label="End Date & Time"
              type="datetime-local"
              name="endTime"
              fullWidth
              value={newAppointment.endTime}
              onChange={handleInputChange}
              error={!newAppointment.endTime && appointmentFieldTouched.endTime}
              helperText={
                !newAppointment.endTime && appointmentFieldTouched.endTime
                  ? "End date and time are required"
                  : ""
              }
            />
            <TextField
              label="Appointment Type"
              name="type"
              select
              fullWidth
              margin="normal"
              value={newAppointment.type}
              onChange={handleInputChange}
              error={!newAppointment.type && appointmentFieldTouched.type}
              helperText={
                !newAppointment.type && appointmentFieldTouched.type
                  ? "Type is required"
                  : ""
              }
            >
              {Object.keys(appointmentType).map((key) => (
                <MenuItem key={key} value={appointmentType[key]}>
                  {appointmentType[key]}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Appointment Status"
              name="status"
              select
              fullWidth
              margin="normal"
              value={newAppointment.status}
              onChange={handleInputChange}
              error={!newAppointment.status && appointmentFieldTouched.status}
              helperText={
                !newAppointment.status && appointmentFieldTouched.status
                  ? "Status is required"
                  : ""
              }
            >
              {Object.keys(appointmentStatus).map((key) => (
                <MenuItem key={key} value={appointmentStatus[key]}>
                  {appointmentStatus[key]}
                </MenuItem>
              ))}
            </TextField>
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

export default AppointmentCreateModal;
