import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import {
  Appointment,
  NewAppointment,
} from "../../../utils/api/appointments.type";
import {
  createAppointment,
  useGetPatients,
  useGetProviders,
} from "../../../utils";
import ErrorNotification from "../../../components/ErrorNotification/ErrorNotification";
import { useNavigate } from "react-router-dom";
import nav from "../../../utils/nav";
import PatientCreateModal from "../../Patient/modal/PatientCreateModal";

const AppointmentCreate = () => {
  const providersResponse = useGetProviders();
  const patientsResponse = useGetPatients();
  const navigate = useNavigate();

  const [patientCreateModalOpen, setPatientCreateModalOpen] = useState(false);
  const [patientId, setPatientId] = useState<string>("");
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    providerId: "",
    startTime: "",
    endTime: "",
    status: "Scheduled",
    type: "Initial Evaluation",
  });
  const [appointmentFieldTouched, setAppointmentFieldTouched] = useState({
    patientId: false,
    providerId: false,
    startTime: false,
    endTime: false,
    status: false,
    type: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<false | Appointment>(false);

  const appointmentValid =
    newAppointment.startTime &&
    newAppointment.endTime &&
    newAppointment.status &&
    newAppointment.type;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
    setAppointmentFieldTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handlePatientCreated = (patientId: string) => {
    setPatientCreateModalOpen(false);
    patientsResponse.refetch();
    setPatientId(patientId);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await createAppointment(patientId, newAppointment);
      if (result.data) setSuccess(result.data);
      if (result.error) throw result.error;
      setTimeout(() => {
        navigate(nav.toPatientDetail(patientId));
      }, 5000);
    } catch (err) {
      setError("Failed to create appointment: " + (err as Error).message);
    }
    setLoading(false);
  };

  if (providersResponse.loading || patientsResponse.loading) {
    return <div>Loading...</div>;
  }

  if (providersResponse.error || patientsResponse.error) {
    return (
      <ErrorNotification
        error={(providersResponse.error || patientsResponse.error) as Error}
      />
    );
  }

  return (
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
            label="Patient"
            name="patientId"
            select
            fullWidth
            margin="normal"
            value={patientId}
            onChange={(event) => setPatientId(event.target.value)}
            error={!patientId && appointmentFieldTouched.patientId}
            helperText={
              !patientId && appointmentFieldTouched.patientId
                ? "Patient is required"
                : ""
            }
          >
            {patientsResponse.data?.map(({ id, firstName, lastName }) => (
              <MenuItem key={id} value={id}>
                {`${firstName} ${lastName}`}
              </MenuItem>
            ))}
          </TextField>
          <PatientCreateModal
            open={patientCreateModalOpen}
            onDone={handlePatientCreated}
            onClose={() => setPatientCreateModalOpen(false)}
          />
          <Button
            onClick={() => setPatientCreateModalOpen(true)}
            color="secondary"
            variant="outlined"
          >
            Create a new patient
          </Button>
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
            <MenuItem value="Initial Evaluation">Initial Evaluation</MenuItem>
            <MenuItem value="Follow Up">Follow Up</MenuItem>
            <MenuItem value="Discharge">Dischrage</MenuItem>
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
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Checked In">Checked In</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
          </TextField>
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
  );
};

export default AppointmentCreate;
