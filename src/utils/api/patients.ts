import { modifyData, useFetchData } from "../fetcher/fetcher";
import { NewPatient, Patient } from "./patients.type";

const useGetPatients = () => useFetchData<Patient[]>({ route: "patients" });

const useGetPatient = (patientId: string) =>
  useFetchData<Patient>({ route: `patients/${patientId}` });

const createPatient = async (patient: NewPatient) =>
  modifyData<NewPatient, Patient>({
    route: "patients",
    type: "POST",
    params: patient,
  });
const updatePatient = async (patientId: string, patient: NewPatient) =>
  modifyData<NewPatient, Patient>({
    route: `patients/${patientId}`,
    type: "PUT",
    params: patient,
  });

const deletePatient = async (patientId: string) =>
  modifyData<undefined, unknown>({
    route: `patients/${patientId}`,
    type: "DELETE",
  });

export {
  useGetPatients,
  useGetPatient,
  createPatient,
  updatePatient,
  deletePatient,
};
