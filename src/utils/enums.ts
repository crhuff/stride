type AppointmentType = "Initial Evaluation" | "Follow Up" | "Discharge";
type AppointmentStatus = "Scheduled" | "Checked In" | "Canceled";

const appointmentStatus: Record<string, AppointmentStatus> = {
  SCHEDULED: "Scheduled",
  CHECKEDIN: "Checked In",
  CANCELED: "Canceled",
};
const appointmentType: Record<string, AppointmentType> = {
  INITIALEVALUATION: "Initial Evaluation",
  FOLLOWUP: "Follow Up",
  DISCHARGE: "Discharge",
};
export type { AppointmentStatus, AppointmentType };
export { appointmentStatus, appointmentType };
