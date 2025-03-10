import axios from "axios";

const API_URL = "http://localhost/react_php_oop/backend/api.php";

export const createUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.log("error while creating user", err);
    throw err;
  }
};

export const readUser = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (user) => {
  try {
    const response = await axios.put(`${API_URL}?id=${user.id}`, user);
    return response.data;
  } catch (err) {
    console.log("error while updating user", err);
    throw err;
  }
};

export const deleteUserData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}?id=${id}`);

    return response.data;
  } catch (err) {
    console.log("error while Deleting user", err);
    throw err;
  }
};

export const fetchFormDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}?id=${id}`);
    return response.data;
  } catch (err) {
    console.log("error while Deleting user", err);
    throw err;
  }
};
