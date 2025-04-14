import { getApiData } from "../fetcher/fetcher";
import { Patient } from "./patients.type";

const getPatients = async (): Promise<Patient[]> => {
  try {
    return await getApiData<undefined, Patient[]>("patients", "GET", undefined);
  } catch (err) {
    // replace with logger in the future
    console.log("getPatients: ", err);
    throw err;
  }
};

const getPatient = async (patientId: string): Promise<Patient> => {
  try {
    return await getApiData<undefined, Patient>(
      `patients/${patientId}`,
      "GET",
      undefined,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("getPatient: ", err);
    throw err;
  }
};

const createPatient = async (patient: Patient): Promise<unknown> => {
  try {
    return await getApiData<Patient, unknown>("patients", "POST", patient);
  } catch (err) {
    // replace with logger in the future
    console.log("createPatient: ", err);
    throw err;
  }
};

const updatePatient = async (
  patientId: string,
  patient: Patient,
): Promise<unknown> => {
  try {
    return await getApiData<Patient, unknown>(
      `patients/${patientId}`,
      "PUT",
      patient,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("updatePatient: ", err);
    throw err;
  }
};

const deletePatient = async (patientId: string): Promise<unknown> => {
  try {
    return await getApiData<undefined, unknown>(
      `patients/${patientId}`,
      "DELETE",
      undefined,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("deletePatient: ", err);
    throw err;
  }
};

export { getPatients, getPatient, createPatient, updatePatient, deletePatient };
