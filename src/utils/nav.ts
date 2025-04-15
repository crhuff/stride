const toHome = () => "/";
const toPatients = () => "/patients";
const toPatientDetail = (patientId: string) => `/patients/${patientId}`;
const toAppointments = () => "/appointments";
const toAppointmentCreate = () => "/appointments/create";
const toAppointmentDetail = (patientId: string, appointmentId: string) => `/patients/${patientId}/appointments/${appointmentId}`;

export default {
  toHome,
  toPatients,
  toAppointments,
  toAppointmentCreate,
  toPatientDetail,
  toAppointmentDetail,
};
