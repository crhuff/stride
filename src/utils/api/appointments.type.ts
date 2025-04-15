import { AppointmentStatus, AppointmentType } from "../enums";

type Appointment = {
  id: string;
  patientId: string;
  providerId: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  createdAt: string;
};

type NewAppointment = Omit<Appointment, "id" | "createdAt" | "patientId">;

export type { Appointment, NewAppointment };
