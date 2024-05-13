import React from "react";
import { NextPage } from "next";
import Layout1 from "../../../views/layouts/layout1";
import CheckoutPage from "../../../views/pages/account/checkoutPage";
import router from "next/router";

const Checkout: NextPage = () => {

  const checkLocalStorage = () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (!token || !id) {
      router.push("/pages/account/login"); 
    }
  };

  checkLocalStorage();
  
  return (
    <Layout1>
      <CheckoutPage />
    </Layout1>
  );
};

export default Checkout;
