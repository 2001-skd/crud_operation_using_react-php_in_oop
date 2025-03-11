import React, { useEffect, useState } from "react";
import { deleteUserData, readUser } from "../services/api";
import { Link, useLocation, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { showSuccessToast, showFailureToast } from "../utils/ToastComponent";

const ListUser = () => {
  const [userDataTable, setUserDataTable] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  console.log("userDataTable", userDataTable);
  const successMessage = location.state?.successMessage;
  const successUpdateMessage = location.state?.successUpdateMessage;

  const handleDelete = async (id) => {
    try {
      const response = await deleteUserData(id);
      showSuccessToast("Record Deleted Successfully");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 5000);
      setUserDataTable(userDataTable.filter((value) => value.id !== id));
    } catch (err) {
      console.log("error while creating user", err);
      showFailureToast("Something Went While Deleting Record");
    }
  };

  function handleDeleteClick(id) {
    let getConfirmation = confirm(
      "Do You Want To Delete the Record Permanently ?"
    );
    if (getConfirmation) {
      handleDelete(id);
    }
  }

  // handle eit click function starts
  function handleEditClick(id) {
    navigate(`user/${id}/create`);
  }
  // handle eit click function ends

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
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => handleEditClick(params.row.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  const rows = userDataTable.map((value, index) => ({
    id: value.id,
    name: value.name,
    email: value.email,
    mobile: value.mobile,
  }));
  useEffect(() => {
    fetchUser();
    successMessage;
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
