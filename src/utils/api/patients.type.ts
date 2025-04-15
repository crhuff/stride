type Patient = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  createdAt: string;
  phoneNumber: string;
  id: string;
};

type NewPatient = Omit<Patient, "id" | "createdAt">;

export type { Patient, NewPatient };
