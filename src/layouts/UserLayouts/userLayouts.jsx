import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";

const UserLayouts = () => {
  return (
    <>
      <Header />
      <Outlet />
      <div>
        <Toaster position="top-left" reverseOrder={false} />
      </div>
      <Footer />
    </>
  );
};

export default UserLayouts;
