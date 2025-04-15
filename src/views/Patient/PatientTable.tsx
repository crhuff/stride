import { useGetPatients } from "../../utils";
import TableSkeleton from "../../components/Table/TableSkeleton";
import ErrorNotification from "../../components/ErrorNotification/ErrorNotification";
import { Patient } from "../../utils/api/patients.type";
import BuiltTable, { Column } from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import nav from "../../utils/nav";

type FormattedPatient = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
};

const PatientTable = () => {
  const patientsResponse = useGetPatients();
  const navigate = useNavigate();

  const patients: Patient[] = patientsResponse.data || [];
  const patientsFormatted: Array<FormattedPatient> = patients.map(
    (patient) => ({
      id: patient.id,
      fullName: `${patient.firstName} ${patient.lastName}`,
      dateOfBirth: new Date(patient.dateOfBirth).toLocaleDateString(),
      phoneNumber: patient.phoneNumber,
    }),
  );

  const columns: Column<(typeof patientsFormatted)[0]>[] = [
    { key: "fullName", title: "Patient Name" },
    { key: "dateOfBirth", title: "Date of Birth", isDate: true },
    { key: "phoneNumber", title: "Phone Number" },
  ];

  if (patientsResponse.loading) {
    return <TableSkeleton columns={columns} />;
  }

  if (patientsResponse.error) {
    return <ErrorNotification error={patientsResponse.error} />;
  }

  return (
    <BuiltTable
      data={patientsFormatted}
      columns={columns}
      onRowClick={({ row }: { row: FormattedPatient }) => {
        navigate(nav.toPatientDetail(row.id));
      }}
    />
  );
};
export default PatientTable;
