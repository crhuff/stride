import { getApiData } from "../fetcher/fetcher";
import { Note } from "./notes.type";

const getNotes = async (
  patientId: string,
  appointmentId: string,
): Promise<Note[]> => {
  try {
    return await getApiData<undefined, Note[]>(
      `patients/${patientId}/appointments/${appointmentId}/notes`,
      "GET",
      undefined,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("getNotes: ", err);
    throw err;
  }
};

const getNote = async (
  patientId: string,
  appointmentId: string,
  noteId: string,
): Promise<Note> => {
  try {
    return await getApiData<undefined, Note>(
      `patients/${patientId}/appointments/${appointmentId}/notes/${noteId}`,
      "GET",
      undefined,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("getNote: ", err);
    throw err;
  }
};

const createNote = async (
  patientId: string,
  appointmentId: string,
  note: Note,
): Promise<unknown> => {
  try {
    return await getApiData<Note, unknown>(
      `patients/${patientId}/appointments/${appointmentId}/notes`,
      "POST",
      note,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("createNote: ", err);
    throw err;
  }
};

const updateNote = async (
  patientId: string,
  appointmentId: string,
  noteId: string,
  note: Note,
): Promise<unknown> => {
  try {
    return await getApiData<Note, unknown>(
      `patients/${patientId}/appointments/${appointmentId}/notes/${noteId}`,
      "PUT",
      note,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("updateNote: ", err);
    throw err;
  }
};

const deleteNote = async (
  patientId: string,
  appointmentId: string,
  noteId: string,
): Promise<unknown> => {
  try {
    return await getApiData<undefined, unknown>(
      `patients/${patientId}/appointments/${appointmentId}/notes/${noteId}`,
      "DELETE",
      undefined,
    );
  } catch (err) {
    // replace with logger in the future
    console.log("deleteNote: ", err);
    throw err;
  }
};

export { getNotes, getNote, createNote, updateNote, deleteNote };
