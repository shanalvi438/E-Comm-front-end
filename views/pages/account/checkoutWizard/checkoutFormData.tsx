import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Input, Label, Form, Row, Col, FormGroup } from "reactstrap";
import { CartContext } from "helpers/cart/cart.context";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { CurrencyContext } from "helpers/currency/CurrencyContext";
import { useSelector } from "react-redux";
import { CheckoutState } from "store/product/reducers";
import axios from "axios";
import { GET_USER_PROFILE } from "utils/constants";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const CheckoutFormData = () => {
  const { cartItems, cartTotal, emptyCart } = React.useContext(CartContext);
  const { selectedCurr } = React.useContext(CurrencyContext);
  const { symbol, value } = selectedCurr;
  const router = useRouter();
  const calculateProductTotal = (item) => {
    const selectedPrice =
      item.condition === "New"
        ? item.new_sale_price
        : item.refurnished_sale_price;
    return selectedPrice * item.qty;
  };

  // Calculate the overall cart total
  const calculateCartTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + calculateProductTotal(item),
      0
    );
  };

  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    customer_id: 0,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    company_name: "",
    address: "",
    zip_code: "",
    country: "",
    city: "",
    state: "",
  });

  console.log("formData: step 3", formData);

  useEffect(() => {
    setId(localStorage.getItem("id"));

    const loadItems = async () => {
      try {
        const response = await axios.get(`${GET_USER_PROFILE}/${id}`);
        const itemData = response.data;
        setFormData(itemData.shipping_address);
        console.log("itemData", itemData);
      } catch (error) {
        console.log(error);
      }
    };
    loadItems();
  }, [id]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col mb-5">
            <Image
              src={`/images/layout-2/logo/im-logo.png`}
              className="img-fluid logo"
              width="200px"
              height="100%"
              alt="logo"
              layout="intrinsic"
            />
          </div>
          <p className="mb-5 fs-1 text-dark">
            <span className="fw-bold">Hello!</span> '{formData.first_name}{" "}
            {formData.last_name}'
          </p>
          <FontAwesomeIcon
            className="mb-5 text-success"
            icon={faCheckCircle}
            size="10x"
          />
          <h1 className="text-dark" style={{ fontWeight: "100" }}>
            ORDER CONFIRMED!
          </h1>
          <p className="fs-2 text-dark">
            Your order has been received will be delivered soon
          </p>
          <Link href="/orders">
            <p className="text-decoration-underline text-primary cursor-pointer fs-4 mb-4">
              Go To MY ORDERS
            </p>
          </Link>
          <div className="col">
            <button
              onClick={() => router.push("/pages/account/dashboard")}
              className="btn mb-4"
              style={{
                width: "250px",
                height: "60px",
                fontSize: "23px",
                fontWeight: "normal",
                background: "#4473c5",
                color: "#fff",
                border: "none",
                boxShadow: "0 3px 7px 1px rgba(0,0,0,0.4)",
              }}
            >
              Go To Dashboard
            </button>
            <p className="fs-6 mb-5">
              Have any questions? Contact to our{" "}
              <Link href="/">
                <span
                  className="fw-bold cursor-pointer"
                  style={{ color: "#4473c5" }}
                >
                  Support Center
                </span>
              </Link>
            </p>
            <p className="fw-bold fs-5">Contact Us</p>
            <p>Email: industrymall.net@gmail.com</p>
            <p>© 2023-24 INDUSTRY MALL ®All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutFormData;
