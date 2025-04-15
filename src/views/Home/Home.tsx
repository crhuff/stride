import { Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import nav from "../../utils/nav";
import { useHeader } from "../../utils/header/useHeader";
import { useEffect } from "react";

const Home = () => {
  const { setBackButtonVisible } = useHeader();

  useEffect(() => {
    setBackButtonVisible(false);
  }, [setBackButtonVisible]);

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
      </Stack>
    </Container>
  );
};

export default Home;
