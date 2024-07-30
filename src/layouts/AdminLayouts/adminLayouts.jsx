import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Footer, HeaderAdmin } from "../../components";

const AdminLayout = () => {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
      <div>
        <Toaster position="top-left" reverseOrder={false} />
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
