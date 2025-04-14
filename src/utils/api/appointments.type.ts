type AppointmentType = 'Initial Evaluation' | 'Follow Up' | 'Discharge';
type AppointmentStatus = 'Scheduled' | 'Checked In' | 'Canceled';

type Appointment = {
  id?: string;
  patientId?: string;
  providerId?: string;
  date: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  createdAt: string;
};

export type { Appointment };
