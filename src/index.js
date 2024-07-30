import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { UserLayout, AdminLayout } from "./layouts";
import {
  Acceuil,
  Produits,
  ProduitsDetails,
  Contact,
  EspaceClient,
  EspaceAdmin,
  ErrorPage,
} from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddProduct } from "./components";
import ListUsers from "./components/ListUsers/listUsers";

const PrivateAdminRoute = ({ element: Component }) => {
  const user = JSON.parse(localStorage.getItem("DataLogin"));
  const isAuth = user != null && user.role === "ADMIN";
  return isAuth ? <Component /> : <Navigate to="/espaceclient" />;
};

const PrivateUserRoute = ({ element: Component }) => {
  const user = JSON.parse(localStorage.getItem("DataLogin"));
  const isAuth = user != null && user.role === "USER";
  return isAuth ? <Component /> : <Navigate to="/espaceclient" />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Acceuil />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/produits/:id" element={<ProduitsDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/espaceclient" element={<EspaceClient />} />
          <Route path="/*" element={<ErrorPage />} />
        </Route>

        <Route
          path="/admin"
          element={<PrivateAdminRoute element={AdminLayout} />}
        >
          <Route index element={<EspaceAdmin />} />
          <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path="/admin/listuser" element={<ListUsers />} />
        </Route>

        <Route path="/user" element={<PrivateUserRoute element={UserLayout} />}>
          <Route index element={<EspaceClient />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
