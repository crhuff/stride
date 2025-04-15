import { useFetchData, modifyData, Options } from "../fetcher/fetcher";
import { Appointment, NewAppointment } from "./appointments.type";

const useGetAppointments = (
  patientId: string,
  { options }: { options?: Options } = {},
) =>
  useFetchData<Appointment[]>({
    route: `patients/${patientId}/appointments`,
    options,
  });

const useGetAppointment = (
  patientId: string,
  appointmentId: string,
  { options }: { options?: Options } = {},
) =>
  useFetchData<Appointment[]>({
    route: `patients/${patientId}/appointments/${appointmentId}`,
    options,
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
