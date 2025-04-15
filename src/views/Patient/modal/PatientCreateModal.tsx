import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createPatient } from "../../../utils";
import { NewPatient, Patient } from "../../../utils/api/patients.type";
import { useEffect, useState } from "react";

export type PatientCreateModalProps = {
  open: boolean;
  onClose?: () => void;
  onDone?: (patientId: string) => void;
};

const PatientCreateModal = ({
  open = false,
  onClose,
  onDone,
}: PatientCreateModalProps) => {
  const [newPatient, setNewPatient] = useState<NewPatient>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
  });
  const [patientFieldTouched, setPatientFieldTouched] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    phoneNumber: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<false | Patient>(false);

  const patientValid =
    newPatient.firstName &&
    newPatient.lastName &&
    newPatient.dateOfBirth &&
    new Date(newPatient.dateOfBirth) < new Date() &&
    newPatient.phoneNumber;

  useEffect(() => {
    if (!open) {
      setNewPatient({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        phoneNumber: "",
      });
      setPatientFieldTouched({
        firstName: false,
        lastName: false,
        dateOfBirth: false,
        phoneNumber: false,
      });
      setLoading(false);
      setError(null);
      setSuccess(false);
    }
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
    setPatientFieldTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await createPatient(newPatient);
      if (result.data) setSuccess(result.data);
      if (result.error) throw result.error;
    } catch (err) {
      setError("Failed to create patient: " + (err as Error).message);
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
          Add New Patient
        </Typography>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" mb={2}>
            Patient created successfully!
          </Typography>
        )}
        {!success && !error && (
          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={newPatient.firstName}
              error={!newPatient.firstName && patientFieldTouched.firstName}
              helperText={
                !newPatient.firstName && patientFieldTouched.firstName
                  ? "First name is required"
                  : ""
              }
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={newPatient.lastName}
              error={!newPatient.lastName && patientFieldTouched.lastName}
              helperText={
                !newPatient.lastName && patientFieldTouched.lastName
                  ? "Last name is required"
                  : ""
              }
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={newPatient.dateOfBirth}
              onChange={handleInputChange}
              error={
                (!newPatient.dateOfBirth && patientFieldTouched.dateOfBirth) ||
                (new Date(newPatient.dateOfBirth) > new Date() &&
                  patientFieldTouched.dateOfBirth)
              }
              slotProps={{ inputLabel: { shrink: true } }}
              helperText={
                !newPatient.dateOfBirth && patientFieldTouched.dateOfBirth
                  ? "Date of birth is required"
                  : new Date(newPatient.dateOfBirth) > new Date() &&
                      patientFieldTouched.dateOfBirth
                    ? "Date of birth must be in the past"
                    : ""
              }
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={newPatient.phoneNumber}
              onChange={handleInputChange}
              error={!newPatient.phoneNumber && patientFieldTouched.phoneNumber}
              helperText={
                !newPatient.phoneNumber && patientFieldTouched.phoneNumber
                  ? "Phone number is required"
                  : ""
              }
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              disabled={!patientValid || loading}
            >
              Save
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default PatientCreateModal;
