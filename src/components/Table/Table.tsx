import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export type Column<T> = Omit<
  GridColDef,
  "key" | "title" | "isDate" | "field" | "headerName"
> & {
  key: keyof T; // Ensures the key matches a property in the data object
  title: string;
  isDate?: boolean;
};

type TableProps<T> = Omit<DataGridProps, "columns" | "pageSize"> & {
  data: Array<T & { id?: string | number }>; // Array of data objects
  columns: Array<Column<T>>; // Array of column definitions
  pageSize?: number; // Optional: Number of rows per page
};

const BuiltTable = <T,>({
  data,
  columns,
  pageSize = 10,
  ...rest
}: TableProps<T>) => {
  // Map columns to DataGrid's GridColDef format
  const gridColumns: GridColDef[] = columns.map((column) => ({
    ...column,
    field: String(column.key),
    headerName: column.title,
    flex: 1, // Adjust column width dynamically
    sortable: true,
    sortComparator: column.isDate
      ? (v1, v2) => new Date(v1).getTime() - new Date(v2).getTime()
      : undefined, // Custom sorting for date columns
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={data.map((row, index) => ({
          id: row?.id || index,
          ...row,
        }))}
        columns={gridColumns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize } },
        }}
        pageSizeOptions={[5, 10, 20]}
        {...rest}
      />
    </Box>
  );
};

export default BuiltTable;
