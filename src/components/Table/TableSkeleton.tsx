import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export type Column<T> = {
  key: keyof T;
  title: string;
  isDate?: boolean;
};

type TableSkeletonProps<T> = {
  columns: Array<Column<T>>;
  pageSize?: number;
};

const TableSkeleton = <T,>({
  columns,
  pageSize = 10,
}: TableSkeletonProps<T>) => {
  // Map columns to DataGrid's GridColDef format
  const gridColumns: GridColDef[] = columns.map((column) => ({
    field: String(column.key),
    headerName: column.title,
    flex: 1,
    sortable: true,
    sortComparator: column.isDate
      ? (v1, v2) => new Date(v1).getTime() - new Date(v2).getTime()
      : undefined, // Custom sorting for date columns
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        loading={true}
        columns={gridColumns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize } },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </Box>
  );
};

export default TableSkeleton;
