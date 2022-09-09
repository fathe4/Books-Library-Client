import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/LoginRegister/Login/Login";
import PrivateRoute from "./components/LoginRegister/PrivateRoute/PrivateRoute";
import Register from "./components/LoginRegister/Register/Register";
import AuthProvider from "./context/AuthProvider";
import AllBooks from "./pages/AllBooks";
import CreateBook from "./pages/CreateBook";
import Home from "./pages/Home";
import MyBooks from "./pages/MyBooks";
import UpdateBook from "./pages/UpdateBook";
import AdminRoute from "./components/LoginRegister/Login/AdminRoute/AdminRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            >
              <Route index element={<AllBooks />} />
              <Route
                path="create-book"
                element={
                  <AdminRoute>
                    <CreateBook />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="update-book/:id"
                element={
                  <AdminRoute>
                    <UpdateBook />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="my-books"
                element={
                  <AdminRoute>
                    <MyBooks />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/all-books"
                element={
                  <PrivateRoute>
                    <AllBooks />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
