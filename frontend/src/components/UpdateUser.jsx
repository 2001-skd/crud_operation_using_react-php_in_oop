import React, { useEffect, useState } from "react";
import { fetchFormDetails, updateUser } from "../services/api";
import { showFailureToast, showSuccessToast } from "../utils/ToastComponent";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("User ID:", id);

  const [user, setUser] = useState({
    id: id,
    name: "",
    email: "",
    mobile: "",
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await updateUser(user);
      console.log("API Response:", response);
      // showSuccessToast("Record Updated Successfully");
      navigate("/", {
        state: {
          successMessage: showSuccessToast("Record Created Successfully"),
        },
      });
    } catch (err) {
      console.error("Error while updating user", err);
      showFailureToast("Something Went Wrong While Updating Record");
    }
  }

  // Fetch user details based on the ID
  async function fetchFormDetailsBasedOnId(userId) {
    try {
      const response = await fetchFormDetails(userId);
      console.log("Fetched user:", response);
      if (response && response.name && response.email && response.mobile) {
        setUser(response);
      } else {
        console.error("Invalid user data fetched", response);
      }
    } catch (err) {
      console.error("Error while fetching user details", err);
    }
  }

  // Fetch the user details when the component loads
  useEffect(() => {
    if (id) {
      fetchFormDetailsBasedOnId(id);
    }
  }, [id]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update User</h2>
      <form style={styles.form} onSubmit={handleSubmit} method="post">
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter name"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter email"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    display: "block",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UpdateUser;
