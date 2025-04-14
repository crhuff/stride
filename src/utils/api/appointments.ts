import { getApiData } from "../fetcher/fetcher";
import { Appointment } from "./appointments.type";

const getAppointments = async (patientId: string): Promise<Appointment[]> => {
  try {
    return await getApiData<undefined, Appointment[]>(
      `patients/${patientId}/appointments`,
      "GET",
      undefined,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("getAppointments: ", err);
    throw err;
  }
};

const getAppointment = async (
  patientId: string,
  appointmentId: string,
): Promise<Appointment> => {
  try {
    return await getApiData<undefined, Appointment>(
      `patients/${patientId}/appointments/${appointmentId}`,
      "GET",
      undefined,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("getAppointment: ", err);
    throw err;
  }
};

const createAppointment = async (
  patientId: string,
  appointment: Appointment,
): Promise<unknown> => {
  try {
    return await getApiData<Appointment, unknown>(
      `patients/${patientId}/appointments`,
      "POST",
      appointment,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("createAppointment: ", err);
    throw err;
  }
};

const updateAppointment = async (
  patientId: string,
  appointmentId: string,
  appointment: Appointment,
): Promise<unknown> => {
  try {
    return await getApiData<Appointment, unknown>(
      `patients/${patientId}/appointments/${appointmentId}`,
      "PUT",
      appointment,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("updateAppointment: ", err);
    throw err;
  }
};

const deleteAppointment = async (
  patientId: string,
  appointmentId: string,
): Promise<unknown> => {
  try {
    return await getApiData<undefined, unknown>(
      `patients/${patientId}/appointments/${appointmentId}`,
      "DELETE",
      undefined,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("deleteAppointment: ", err);
    throw err;
  }
};

export {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
