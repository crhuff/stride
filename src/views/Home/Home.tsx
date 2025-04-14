import { Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import nav from "../../utils/nav";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Stack spacing={2} direction="column" alignItems="center">
        <Button variant="contained" onClick={() => navigate(nav.toPatients())}>
          View Patients
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(nav.toAppointmentCreate())}
        >
          Create Appointment
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(nav.toAppointments())}
        >
          View Appointments
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
