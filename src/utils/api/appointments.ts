import { useFetchData, modifyData } from "../fetcher/fetcher";
import { Appointment, NewAppointment } from "./appointments.type";

const useGetAppointments = (patientId: string) =>
  useFetchData<Appointment[]>({
    route: `patients/${patientId}/appointments`,
  });

const useGetAppointment = (patientId: string, appointmentId: string) =>
  useFetchData<Appointment[]>({
    route: `patients/${patientId}/appointments/${appointmentId}`,
  });

const createAppointment = async (
  patientId: string,
  appointment: NewAppointment,
) =>
  modifyData<NewAppointment, Appointment>({
    route: `patients/${patientId}/appointments`,
    type: "POST",
    params: appointment,
  });

const updateAppointment = async (
  patientId: string,
  appointmentId: string,
  appointment: NewAppointment,
) =>
  modifyData<NewAppointment, Appointment>({
    route: `patients/${patientId}/appointments/${appointmentId}`,
    type: "PUT",
    params: appointment,
  });

const deleteAppointment = async (patientId: string, appointmentId: string) =>
  modifyData<undefined, unknown>({
    route: `patients/${patientId}/appointments/${appointmentId}`,
    type: "DELETE",
  });

export {
  useGetAppointments,
  useGetAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
