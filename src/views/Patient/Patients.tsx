import { useState } from "react";
import PatientTable from "./PatientTable";
import { Box, Typography, Button } from "@mui/material";
import PatientCreateModal from "./modal/PatientCreateModal";
import { useNavigate } from "react-router-dom";
import nav from "../../utils/nav";
import { useGetPatients } from "../../utils";

const Patients = () => {
  const navigate = useNavigate();
  const { refetch } = useGetPatients();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div id="patients-page">
      <Box
        className="header"
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
      <div className="table-container">
        <PatientTable />
      </div>
      <PatientCreateModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onDone={(patientId: string) => {
          refetch();
          navigate(nav.toPatientDetail(patientId));
        }}
      />
    </div>
  );
};
export default Patients;
