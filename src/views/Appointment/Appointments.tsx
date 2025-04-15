import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const appointments = [
    { date: new Date(2023, 9, 15), title: "Dentist Appointment" },
    { date: new Date(2023, 9, 20), title: "Team Meeting" },
    { date: new Date(2023, 9, 25), title: "Project Deadline" },
  ];

  const filteredAppointments = appointments.filter(
    (appointment) =>
      selectedDate &&
      appointment.date.toDateString() === selectedDate.toDate()?.toDateString(),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Upcoming Appointments
        </Typography>
        <Box sx={{ display: "flex", gap: 4 }}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
          />
          <Box>
            <Typography variant="h6">Appointments on Selected Date:</Typography>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <Paper
                  key={index}
                  sx={{ p: 2, mt: 2, backgroundColor: "#f5f5f5" }}
                >
                  <Typography>{appointment.title}</Typography>
                </Paper>
              ))
            ) : (
              <Typography sx={{ mt: 2 }}>No appointments found.</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Appointments;
