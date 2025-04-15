import { useState } from "react";
import PatientTable from "./PatientTable";
import { Box, Typography, Button } from "@mui/material";
import PatientCreateModal from "./PatientCreateModal";
import { useNavigate } from "react-router-dom";
import nav from "../../utils/nav";
import { useGetPatients } from "../../utils";

const Patients = () => {
  const navigate = useNavigate();
  const { refetch } = useGetPatients();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Current Patients</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          Add New Patient
        </Button>
      </Box>
      <PatientTable />
      <PatientCreateModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onDone={(patientId: string) => {
          refetch();
          navigate(nav.toPatientDetail(patientId));
        }}
      />
    </>
  );
};
export default Patients;
