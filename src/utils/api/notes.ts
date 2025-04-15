import { useFetchData, modifyData, Options } from "../fetcher/fetcher";
import { NewNote, Note } from "./notes.type";

const useGetNotes = (
  patientId: string,
  appointmentId: string,
  { options }: { options?: Options } = {},
) =>
  useFetchData<Note[]>({
    route: `patients/${patientId}/appointments/${appointmentId}/notes`,
    options,
  });

const useGetNote = (
  patientId: string,
  appointmentId: string,
  noteId: string,
  { options }: { options?: Options } = {},
) =>
  useFetchData<Note>({
    route: `patients/${patientId}/appointments/${appointmentId}/notes/${noteId}`,
    options,
  });

const createNote = async (
  patientId: string,
  appointmentId: string,
  note: NewNote,
) =>
  modifyData<NewNote, Note>({
    route: `patients/${patientId}/appointments/${appointmentId}/notes`,
    type: "POST",
    params: note,
  });

const updateNote = async (
  patientId: string,
  appointmentId: string,
  noteId: string,
  note: NewNote,
) =>
  modifyData<NewNote, Note>({
    route: `patients/${patientId}/appointments/${appointmentId}/notes/${noteId}`,
    type: "PUT",
    params: note,
  });

const deleteNote = async (
  patientId: string,
  appointmentId: string,
  noteId: string,
) =>
  modifyData<undefined, unknown>({
    route: `patients/${patientId}/appointments/${appointmentId}/notes/${noteId}`,
    type: "DELETE",
  });

export { useGetNotes, useGetNote, createNote, updateNote, deleteNote };
