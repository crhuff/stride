import { deletePatient, useGetPatients } from "../../utils";
import TableSkeleton from "../../components/Table/TableSkeleton";
import ErrorNotification from "../../components/ErrorNotification/ErrorNotification";
import { Patient } from "../../utils/api/patients.type";
import BuiltTable, { Column } from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import nav from "../../utils/nav";
import { GridRenderCellParams } from "@mui/x-data-grid";
import ActionsColumn, { Action } from "../../components/Table/ActionsColumn";

type FormattedPatient = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  actions?: string;
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

  const handleDelete = async (id: string) => {
    // Logic to delete the note
    console.log(`Delete note with id: ${id}`);
    try {
      await deletePatient(id);
      patientsResponse.refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const columns: Column<FormattedPatient>[] = [
    { key: "fullName", title: "Patient Name" },
    { key: "dateOfBirth", title: "Date of Birth", isDate: true },
    { key: "phoneNumber", title: "Phone Number" },
    {
      key: "actions",
      title: "Actions",
      renderCell: (params: GridRenderCellParams<FormattedPatient, Date>) => {
        const actions: Action[] = [
          { id: "delete", text: "Delete", onClick: handleDelete },
        ];

        return <ActionsColumn rowId={params.row.id} actions={actions} />;
      },
    },
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
      sx={{
        "& .MuiDataGrid-row": {
          cursor: "pointer",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "rgba(0, 0, 0, .15)",
        },
      }}
    />
  );
};
export default PatientTable;
