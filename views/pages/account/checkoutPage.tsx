import React, { useState } from "react";
import { NextPage } from "next";
import { Row } from "reactstrap";
import { CartContext } from "../../../helpers/cart/cart.context";
import { useRouter } from "next/router";
import { CurrencyContext } from "../../../helpers/currency/CurrencyContext";
import ShoppingCart from "./checkoutWizard/shopingCart";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { toast } from "react-toastify";
import CheckoutForm from "./checkoutWizard/checkoutForm";
import { useSelector } from "react-redux";
import { CheckoutState } from "store/product/reducers";
import CheckoutPayment from "./checkoutWizard/checkoutPayment";
import CheckoutFormData from "./checkoutWizard/checkoutFormData";

const CheckoutPage: NextPage = () => {
  const formData = useSelector(
    (state: CheckoutState) => state.checkout.formData
  );
  const { cartItems, cartTotal, emptyCart } = React.useContext(CartContext);
  const customerId = parseInt(localStorage.getItem("id"));
  const router = useRouter();

  const calculateProductTotal = (item) => {
    const selectedPrice =
      item.condition === "New"
        ? item.new_sale_price
        : item.refurnished_sale_price;
    return selectedPrice * item.qty;
  };

  const calculateCartTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + calculateProductTotal(item),
      0
    );
  };

  const handleComplete = async () => {
    if (formData !== null) {
      const requestBody = {
        customer_info: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: "",
          country: formData.country,
          address_01: formData.address,
          address_02: formData.address2,
          city: formData.city,
          state: formData.state,
          postal_code: formData.pincode.toString(),
          phone1: formData.phone,
          phone2: "",
          email: formData.email,
          comments: "",
          payment_method: formData.paymentMethod,
          shipping: "Standard",
          customer_id: formData.customer_id,
          total_purchase: cartTotal,
          total_price: calculateCartTotal().toFixed(2),
        },
        products: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.qty,
          p_price: item.selectedPrice,
          p_vendor_id: item.created_by,
        })),
      };

      try {
        // Send the POST request to the checkout API
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (response.ok) {
          toast.success("Order placed successfully!");
          localStorage.setItem("order-sucess-items", JSON.stringify(cartItems));
          emptyCart();
          router.push({
            pathname: "/pages/order-success",
          });
        } else {
          console.error("Error placing the order:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <>
      {/* <!-- section start --> */}
      <section className="section-big-py-space">
        <div className="custom-container">
          <div className="checkout-page contact-page  ">
            <FormWizard onComplete={handleComplete}>
              {/* Step 1: Shopping Cart */}
              <FormWizard.TabContent
                title="Shopping Cart"
                icon="ti-shopping-cart"
              >
                <ShoppingCart />
              </FormWizard.TabContent>

              <FormWizard.TabContent
                title="Billing Details"
                icon="ti-credit-card"
              >
                {/* step 2  note submite the form in step 3 not here*/}
                <CheckoutForm />
              </FormWizard.TabContent>

              <FormWizard.TabContent title="Order Review" icon="ti-comment-alt">
                {/* step 3 */}
                {/* show form details here in text form in a box here with */}
                <Row>
                  <CheckoutFormData />
                </Row>
              </FormWizard.TabContent>

              <FormWizard.TabContent title="Payment" icon="ti-credit-card">
                <CheckoutPayment />
              </FormWizard.TabContent>
            </FormWizard>
          </div>
        </div>
      </section>
      {/* <!-- section end --> */}
    </>
  );
};

export default CheckoutPage;
