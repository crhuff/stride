type Note = {
  id: string;
  appointmentId: string;
  createdAt: string;
  chiefComplaint: string;
  treatmentPlan: string;
  progress: string;
};

type NewNote = Omit<Note, "id" | "createdAt" | "appointmentId">;

export type { Note, NewNote };
