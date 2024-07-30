import React from "react";
import ListProduct from "../../components/ListProduct/listProduct";
import AddProduct from "../../components/AddProduct/addProduct";
import ListUsers from "../../components/ListUsers/listUsers";

export default function EspaceAdmin() {
  return (
    <main>
      <AddProduct />
      <ListProduct />
      <ListUsers />
    </main>
  );
}
