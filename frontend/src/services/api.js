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
