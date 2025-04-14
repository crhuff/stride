import { Button, Container, Stack } from "@mui/material"

const Home = () => {
  return (      <Container sx={{ mt: 4 }}>
    <Stack spacing={2} direction="column" alignItems="center">
      <Button variant="contained" onClick={() => console.log("View Patients clicked")}>
    View Patients
      </Button>
      <Button variant="contained" onClick={() => console.log("Create Appointment clicked")}>
    Create Appointment
      </Button>
      <Button variant="contained" onClick={() => console.log("View Appointments clicked")}>
    View Appointments
      </Button>
    </Stack>
  </Container>)
}

export default Home;
