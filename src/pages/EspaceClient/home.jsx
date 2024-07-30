import React, { useEffect, useState } from "react";
import {
  FormLogin,
  FormSignup,
  UserData,
  UserCommande,
} from "../../components";

export default function EspaceClient() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const formData = localStorage.getItem("DataLogin");
    if (formData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <UserData />
          <UserCommande />
        </>
      ) : (
        <>
          <FormSignup />
          <FormLogin />
        </>
      )}
    </>
  );
}
