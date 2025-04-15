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
import { Appointment } from "../../../utils/api/appointments.type";
import {
  updateAppointment,
  useGetProviders,
  useGetAppointment,
} from "../../../utils";
import ErrorNotification from "../../../components/ErrorNotification/ErrorNotification";
import { appointmentStatus, appointmentType } from "../../../utils/enums";

interface AppointmentUpdateModalProps {
  open: boolean;
  onClose: () => void;
  patientId: string;
  appointmentId: string;
  onDone?: (appointmentId: string) => void;
}

const AppointmentUpdateModal: React.FC<AppointmentUpdateModalProps> = ({
  open,
  onClose,
  onDone,
  patientId,
  appointmentId,
}) => {
  const appointmentResponse = useGetAppointment(patientId, appointmentId);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const providersResponse = useGetProviders();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<false | Appointment>(false);

  useEffect(() => {
    if (appointmentResponse.data) {
      setAppointment(appointmentResponse.data);
    }
  }, [appointmentResponse.data]);

  const appointmentValid =
    appointment?.startTime &&
    appointment?.endTime &&
    appointment?.status &&
    appointment?.type;

  useEffect(() => {
    if (!open) {
      setAppointment(null);
      setLoading(false);
      setError(null);
      setSuccess(false);
    }
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointment((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async () => {
    if (!appointment) return;
    setLoading(true);
    try {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id: _id,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        patientId: _patientId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createdAt: _creaetdAt,
        ...newAppointment
      } = appointment;
      const result = await updateAppointment(
        patientId,
        appointmentId,
        newAppointment,
      );
      if (result.data) setSuccess(result.data);
      if (result.error) throw result.error;
    } catch (err) {
      setError("Failed to update appointment: " + (err as Error).message);
    }
    setLoading(false);
  };
  if (providersResponse.error || appointmentResponse.error) {
    return (
      <Modal open={open} onClose={onClose}>
        <ErrorNotification
          error={
            (providersResponse.error || appointmentResponse.error) as Error
          }
        />
      </Modal>
    );
  }
  if (
    providersResponse.loading ||
    appointmentResponse.loading ||
    !appointment
  ) {
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
          Update Appointment
        </Typography>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" mb={2}>
            Appointment updated successfully!
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
              value={appointment.providerId || ""}
              onChange={handleInputChange}
              error={!appointment.providerId}
              helperText={!appointment.providerId ? "Provider is required" : ""}
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
              value={appointment.startTime}
              onChange={handleInputChange}
              error={!appointment.startTime}
              helperText={
                !appointment.startTime ? "Start date and time are required" : ""
              }
            />
            <TextField
              label="End Date & Time"
              type="datetime-local"
              name="endTime"
              fullWidth
              value={appointment.endTime}
              onChange={handleInputChange}
              error={!appointment.endTime}
              helperText={
                !appointment.endTime ? "End date and time are required" : ""
              }
            />
            <TextField
              label="Appointment Type"
              name="type"
              select
              fullWidth
              margin="normal"
              value={appointment.type || ""}
              onChange={handleInputChange}
              error={!appointment.type}
              helperText={!appointment.type ? "Type is required" : ""}
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
              value={appointment.status || ""}
              onChange={handleInputChange}
              error={!appointment.status}
              helperText={
                !appointment.status && appointment.status
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
              Update
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default AppointmentUpdateModal;
