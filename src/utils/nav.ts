const toHome = () => "/";
const toPatients = () => "/patients";
const toPatientDetail = (patientId: string) => `/patients/${patientId}`;
const toAppointments = () => "/appointments";
const toAppointmentCreate = () => "/appointments/create";

export default {
  toHome,
  toPatients,
  toAppointments,
  toAppointmentCreate,
  toPatientDetail,
};
