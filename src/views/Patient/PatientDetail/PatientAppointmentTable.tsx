import TableSkeleton from "../../../components/Table/TableSkeleton";
import ErrorNotification from "../../../components/ErrorNotification/ErrorNotification";
import BuiltTable, { Column } from "../../../components/Table/Table";
import { useGetAppointments, useGetProviders } from "../../../utils";
import {
  Appointment,
  AppointmentStatus,
  AppointmentType,
} from "../../../utils/api/appointments.type";

type FormattedAppointment = {
  id: string;
  provider: string;
  date: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  createdAt: string;
};

const PatientAppointmentTable = ({ patientId }: { patientId: string }) => {
  const appointmentsResponse = useGetAppointments(patientId);
  const providersResponse = useGetProviders();

  const columns: Column<FormattedAppointment>[] = [
    { key: "provider", title: "Provider" },
    { key: "date", title: "Date", isDate: true },
    { key: "startTime", title: "Start time" },
    { key: "endTime", title: "End time" },
    { key: "type", title: "Type" },
    { key: "status", title: "Status" },
    { key: "createdAt", title: "Created at", isDate: true },
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
  console.log(appointments);

  return <BuiltTable data={appointmentsFormatted} columns={columns} />;
};
export default PatientAppointmentTable;
