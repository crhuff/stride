import { useEffect, useState } from "react";
import TableSkeleton from "../../components/Table/TableSkeleton";
import ErrorNotification from "../../components/ErrorNotification/ErrorNotification";
import BuiltTable, { Column } from "../../components/Table/Table";
import {
  deleteAppointment,
  useGetAppointments,
  useGetProviders,
} from "../../utils";
import { Appointment } from "../../utils/api/appointments.type";
import { GridRenderCellParams } from "@mui/x-data-grid";
import ActionsColumn, { Action } from "../../components/Table/ActionsColumn";
import AppointmentUpdateModal from "./modal/AppointmentUpdateModal";
import { useNavigate } from "react-router-dom";
import nav from "../../utils/nav";
import { AppointmentStatus, AppointmentType } from "../../utils/enums";

type FormattedAppointment = {
  id: string;
  provider: string;
  date: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  createdAt: string;
  actions?: string;
};

const AppointmentTable = ({
  patientId,
  refetchTrigger,
}: {
  patientId: string;
  refetchTrigger: number;
}) => {
  const navigate = useNavigate();
  const appointmentsResponse = useGetAppointments(patientId);
  const providersResponse = useGetProviders();
  const [editModalId, setEditModalId] = useState<string | null>(null);

  useEffect(() => {
    appointmentsResponse.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTrigger]);

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(patientId, id);
      appointmentsResponse.refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id: string) => {
    setEditModalId(id);
  };

  const columns: Column<FormattedAppointment>[] = [
    { key: "status", title: "Status" },
    { key: "date", title: "Date", isDate: true },
    { key: "startTime", title: "Start time" },
    { key: "endTime", title: "End time" },
    { key: "provider", title: "Provider" },
    { key: "type", title: "Type" },
    { key: "createdAt", title: "Created at", isDate: true },
    {
      key: "actions",
      title: "Actions",
      renderCell: (
        params: GridRenderCellParams<FormattedAppointment, Date>,
      ) => {
        const actions: Action[] = [
          { id: "edit", text: "Edit", onClick: handleEdit },
          { id: "delete", text: "Delete", onClick: handleDelete },
        ];

        return <ActionsColumn rowId={params.row.id} actions={actions} />;
      },
    },
  ];
  if (appointmentsResponse.loading || providersResponse.loading) {
    return <TableSkeleton columns={columns} />;
  }

  if (appointmentsResponse?.status === 404)
    return <BuiltTable columns={columns} data={[]} />;

  if (appointmentsResponse.error || providersResponse.error) {
    return (
      <ErrorNotification
        error={(appointmentsResponse.error || providersResponse.error) as Error}
      />
    );
  }

  const appointments: Appointment[] = appointmentsResponse.data || [];
  const appointmentsFormatted: Array<FormattedAppointment> = appointments.map(
    (appointment) => {
      const provider = providersResponse.data?.find(
        (provider) => provider.id === appointment.providerId,
      );
      return {
        id: appointment.id,
        provider:
          (provider && `${provider.firstName} ${provider.lastName}`) ||
          "No provider found",
        date: new Date(appointment.startTime).toLocaleDateString(),
        startTime: new Date(appointment.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: new Date(appointment.endTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: appointment.type,
        status: appointment.status,
        createdAt: new Date(appointment.createdAt).toLocaleDateString(),
      };
    },
  );

  return (
    <>
      <BuiltTable
        data={appointmentsFormatted}
        columns={columns}
        onRowClick={({ row }: { row: FormattedAppointment }) => {
          navigate(nav.toAppointmentDetail(patientId, row.id));
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
      <AppointmentUpdateModal
        open={!!editModalId}
        onClose={() => setEditModalId(null)}
        onDone={() => {
          appointmentsResponse.refetch();
          setEditModalId(null);
        }}
        appointmentId={editModalId || ""}
        patientId={patientId}
      />
    </>
  );
};
export default AppointmentTable;
