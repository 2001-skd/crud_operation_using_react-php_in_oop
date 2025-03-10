import { BrowserRouter, Routes, Route, Link } from "react-router";
import ListUser from "./components/ListUser";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="app">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5>List User</h5>
          <Link to="user/create">
            <button>Create User</button>
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<ListUser />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/:id/edit" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
