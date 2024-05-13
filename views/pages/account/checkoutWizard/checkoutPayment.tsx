import React, { useState } from "react";
import { NextPage } from "next";
import { Input, Label, Form, Row, Col, FormGroup, Button } from "reactstrap";
import { CartContext } from "helpers/cart/cart.context";
import Link from "next/link";
import "react-form-wizard-component/dist/style.css";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { CurrencyContext } from "helpers/currency/CurrencyContext";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutState, setCheckoutFormData } from "store/product/reducers";

const isCardPayment = (method: string): method is "card" => method === "card";

const CheckoutPayment: NextPage = () => {
  const formData = useSelector(
    (state: CheckoutState) => state.checkout.formData
  );

  const { cartItems, emptyCart } = React.useContext(CartContext);
  const { selectedCurr } = React.useContext(CurrencyContext);
  const { symbol } = selectedCurr;
  const dispatch = useDispatch();

  const [cardInputs, setCardInputs] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const handleCardInputChange = (field, value) => {
    let regex;

    switch (field) {
      case "cardNumber":
        regex = /^[0-9\s]{0,14}$/; // Only allow digits and spaces
        break;
      case "cardExpiry":
        regex = /^[1-9]{0,4}$/; // Allow MM, MM/YY, or MM/ (month/year)
        break;
      case "cardCVC":
        regex = /^[0-9]{0,3}$/; // Only allow digits
        break;
      default:
        break;
    }

    if (regex.test(value) || value === "") {
      setCardInputs((prevState) => ({ ...prevState, [field]: value }));
    }
  };

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

  const handleInputChange = (field, value) => {
    dispatch(
      setCheckoutFormData({
        ...formData,
        [field]: value,
      })
    );
  };

  return (
    <>
      <div className="checkout-details theme-form section-big-mt-space">
        <Row>
          <Col lg="6" sm="12" xs="12">
            <div className="checkout-details ">
              <div className="order-box">
                <div className="title-box">
                  <h3>Billing Details</h3>
                </div>

                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="fw-bold">First Name:</span>
                    <span className="ml-auto">{formData.firstName}</span>
                  </li>
                  {/* ... (more list items) */}
                </ul>
              </div>
            </div>
          </Col>

          <Col lg="6" sm="12" xs="12">
            <div className="checkout-details">
              {cartItems && cartItems.length > 0 ? (
                <div className="order-box">
                  <div className="title-box">
                    <div>
                      Product <span>Total</span>
                    </div>
                  </div>
                  <ul className="qty">
                    {cartItems.map((item, index) => (
                      <Link href={`/product-details/${item.id}`} key={index}>
                        <li>
                          <img
                            src={item.url}
                            alt={item.name.substring(0, 9)}
                            width="100px"
                          />
                          <span>
                            {item.name} × {item.qty}{" "}
                          </span>
                          <span>
                            {symbol}
                            {calculateProductTotal(item).toFixed(2)}
                          </span>
                        </li>
                      </Link>
                    ))}
                  </ul>

                  <ul className="sub-total">
                    <li>
                      Subtotal{" "}
                      <span className="count">
                        {symbol}
                        {calculateCartTotal().toFixed(2)}
                      </span>
                    </li>
                    <li>
                      Shipping
                      <div className="shipping">
                        {/* ...Your shipping options */}
                      </div>
                    </li>
                  </ul>
                  <ul className="total">
                    <li>
                      Total{" "}
                      <span className="count">
                        {symbol}
                        {calculateCartTotal().toFixed(2)}
                      </span>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
              <div className="payment-box">
                <div className="upper-box">
                  <div className="payment-options">
                    {/* ...Your payment options */}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Col lg="6" sm="12" xs="12">
          <FormGroup tag="fieldset">
            <div className="checkout-title">
              <h3>Select Payment Method</h3>
            </div>
            <RadioGroup
              row
              aria-label="paymentMethod"
              name="paymentMethod"
              // onChange={(e) =>
              //   handleInputChange("paymentMethod", e.target.value)
              // }
            >
              <FormGroup>
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on Delivery"
                  className="d-flex justify-content-start"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit/Debit Card"
                  className="d-flex justify-content-start"
                />
              </FormGroup>
            </RadioGroup>
          </FormGroup>

          {isCardPayment(formData.paymentMethod) && (
            <div>
              <Label for="cardNumber" className="d-flex justify-content-start">
                Card Number
              </Label>
              <Input
                type="text"
                name="cardNumber"
                id="cardNumber"
                value={cardInputs.cardNumber}
                placeholder="1234 1234 1234 1234"
                onChange={(e) =>
                  handleCardInputChange("cardNumber", e.target.value)
                }
              />

              <Label for="cardExpiry" className="d-flex justify-content-start">
                Expiry Date
              </Label>
              <Input
                type="text"
                name="cardExpiry"
                id="cardExpiry"
                value={cardInputs.cardExpiry}
                placeholder="MM/YY"
                onChange={(e) =>
                  handleCardInputChange("cardExpiry", e.target.value)
                }
              />

              <Label for="cardCVC" className="d-flex justify-content-start">
                CVC
              </Label>
              <Input
                type="text"
                name="cardCVC"
                id="cardCVC"
                value={cardInputs.cardCVC}
                placeholder="CVC"
                onChange={(e) =>
                  handleCardInputChange("cardCVC", e.target.value)
                }
              />
            </div>
          )}
        </Col>
       
      </div>
      
    </>
  );
};

export default CheckoutPayment;
