import { useEffect, useState } from "react";
import TableSkeleton from "../../components/Table/TableSkeleton";
import ErrorNotification from "../../components/ErrorNotification/ErrorNotification";
import BuiltTable, { Column } from "../../components/Table/Table";
import { deleteNote, useGetNotes } from "../../utils";
import { GridRenderCellParams } from "@mui/x-data-grid";
import ActionsColumn, { Action } from "../../components/Table/ActionsColumn";
import NoteUpdateModal from "./NoteUpdateModal";
import NoteDetailModal from "./NoteDetailModal";
import { Note } from "../../utils/api/notes.type";

type FormattedNote = {
  id: string;
  createdAt: string;
  chiefComplaint: string;
  treatmentPlan: string;
  progress: string;
  actions?: string; // Add an optional 'actions' property
};

const NoteTable = ({
  patientId,
  appointmentId,
  refetchTrigger,
}: {
  patientId: string;
  refetchTrigger: number;
  appointmentId: string;
}) => {
  const notesResponse = useGetNotes(patientId, appointmentId);
  const [editModalId, setEditModalId] = useState<string | null>(null);
  const [viewModalId, setViewModalId] = useState<string | null>(null);

  useEffect(() => {
    notesResponse.refetch(); // Re-fetch appointments when refetchTrigger changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTrigger]);

  const handleDelete = async (id: string) => {
    // Logic to delete the note
    console.log(`Delete note with id: ${id}`);
    try {
      await deleteNote(patientId, appointmentId, id);
      notesResponse.refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id: string) => {
    // Logic to edit the appointment
    setEditModalId(id);
  };

  const columns: Column<FormattedNote>[] = [
    { key: "progress", title: "Progress" },
    { key: "chiefComplaint", title: "Chief complaint" },
    { key: "treatmentPlan", title: "Treatment plan" },
    { key: "createdAt", title: "Created at", isDate: true },
    {
      key: "actions",
      title: "Actions",
      renderCell: (params: GridRenderCellParams<FormattedNote, Date>) => {
        const actions: Action[] = [
          { id: "edit", text: "Edit", onClick: handleEdit },
          { id: "delete", text: "Delete", onClick: handleDelete },
        ];

        return <ActionsColumn rowId={params.row.id} actions={actions} />;
      },
    },
  ];
  if (notesResponse.loading) {
    return <TableSkeleton columns={columns} />;
  }

  if (notesResponse?.status === 404)
    return <BuiltTable columns={columns} data={[]} />;

  if (notesResponse.error) {
    return <ErrorNotification error={notesResponse.error as Error} />;
  }

  const truncateText = (text: string) => {
    if (text.length > 20) {
      return text.slice(0, 20) + "...";
    }
    return text;
  };
  const notes: Note[] = notesResponse.data || [];
  const notesFormatted: Array<FormattedNote> = notes.map((note) => {
    return {
      id: note.id,
      createdAt: new Date(note.createdAt).toLocaleDateString(),
      chiefComplaint: truncateText(note.chiefComplaint),
      treatmentPlan: truncateText(note.treatmentPlan),
      progress: truncateText(note.progress),
    };
  });

  return (
    <>
      <BuiltTable
        data={notesFormatted}
        columns={columns}
        onRowClick={({ row }: { row: FormattedNote }) => {
          setViewModalId(row.id);
        }}
      />
      <NoteUpdateModal
        open={!!editModalId}
        onClose={() => setEditModalId(null)}
        noteId={editModalId || ""}
        onDone={() => {
          notesResponse.refetch();
          setEditModalId(null);
        }}
        patientId={patientId}
        appointmentId={appointmentId}
      />
      <NoteDetailModal
        open={!!viewModalId}
        onClose={() => setViewModalId(null)}
        noteId={viewModalId || ""}
        patientId={patientId}
        appointmentId={appointmentId}
      />
    </>
  );
};
export default NoteTable;
