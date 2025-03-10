import React, { useEffect, useState } from "react";
import { readUser } from "../services/api";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const ListUser = () => {
  const [userDataTable, setUserDataTable] = useState([]);

  console.log("userDataTable", userDataTable);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
    },
    {
      field: "name",
      headerName: "Username",
      width: 200,
    },
    {
      field: "email",
      headerName: "User Email",
      width: 200,
    },
    {
      field: "mobile",
      headerName: "User Mobile",
      width: 200,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
    },
  ];
  const rows = userDataTable.map((value, index) => ({
    id: index + 1,
    name: value.name,
    email: value.email,
    mobile: value.mobile,
  }));
  useEffect(() => {
    fetchUser();
  }, []);

  // fetch userdata function starts
  async function fetchUser() {
    const userData = await readUser();
    if (userData) {
      setUserDataTable(userData);
    }
  }
  // fetch userdata function ends
  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
      />
    </Box>
  );
};

export default ListUser;
