import React, { useState } from "react";
import { TextField, Button, MenuItem, Grid, Typography } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const AppointmentCreate: React.FC = () => {
  const [patient, setPatient] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);

  const patients = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];

  const handleSubmit = () => {
    if (patient && date && time) {
      console.log("Appointment Created:", { patient, date, time });
      alert("Appointment successfully created!");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={{ marginTop: "2rem" }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="h4" align="center">
            Create Appointment
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            label="Select Patient"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            fullWidth
          >
            {patients.map((p) => (
              <MenuItem key={p.id} value={p.name}>
                {p.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TimePicker
            label="Select Time"
            value={time}
            onChange={(newTime) => setTime(newTime)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Create Appointment
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default AppointmentCreate;
