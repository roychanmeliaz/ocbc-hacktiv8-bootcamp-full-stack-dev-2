import { Button } from "@mui/material";
import { DataGrid, GridApi, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
    {
        field: "more",
        headerName: "",
        sortable: false,
        disableColumnMenu:true,
        renderCell: (params) => {
            const onClick = () => {
                const api: GridApi = params.api;
                const fields = api
                  .getAllColumns()
                  .map((c) => c.field)
                  .filter((c) => c !== "__check__" && !!c);
                const thisRow: any = {};
            
                fields.forEach((f) => {
                  thisRow[f] = params.getValue(params.id, f);
                });
            
                return alert(JSON.stringify(thisRow, null, 4));
            };
        
            return (
                <>
                    <Button onClick={onClick}>More</Button>
                </>
            )
        }
    },
    {
        field: "edit",
        headerName: "",
        sortable: false,
        disableColumnMenu:true,        
        renderCell: (params) => {
            const onClick = () => {
                const api: GridApi = params.api;
                const fields = api
                  .getAllColumns()
                  .map((c) => c.field)
                  .filter((c) => c !== "__check__" && !!c);
                const thisRow: any = {};
            
                fields.forEach((f) => {
                  thisRow[f] = params.getValue(params.id, f);
                });
            
                return alert(JSON.stringify(thisRow, null, 4));
            };
        
            return (
                <>
                    <Button onClick={onClick}>Edit</Button>
                </>
            )
        }
    },
    {
        field: "delete",
        headerName: "",
        sortable: false,
        disableColumnMenu:true,        
        renderCell: (params) => {
            const onClick = () => {
                const api: GridApi = params.api;
                const fields = api
                  .getAllColumns()
                  .map((c) => c.field)
                  .filter((c) => c !== "__check__" && !!c);
                const thisRow: any = {};
            
                fields.forEach((f) => {
                  thisRow[f] = params.getValue(params.id, f);
                });
            
                return alert(JSON.stringify(thisRow, null, 4));
            };
        
            return (
                <>
                    <Button onClick={onClick}>Delete</Button>
                </>
            )
        }
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const TableComponent = () => {
    return (
        <div style={{ height: 390, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick={true}
            />
        </div>
    )
}

export default TableComponent