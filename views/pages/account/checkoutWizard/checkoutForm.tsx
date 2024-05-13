import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Input, Label, Form, Col, FormGroup } from "reactstrap";
import { CartContext } from "helpers/cart/cart.context";
import { useForm } from "react-hook-form";
import "react-form-wizard-component/dist/style.css";
import { CurrencyContext } from "helpers/currency/CurrencyContext";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  GET_SPONSORED_PRODUCT,
  GET_USER_PROFILE,
  ORDER_CHECKOUT,
  UPDATE_USER_SHIPPING_ADDRESS,
} from "utils/constants";
import { toast } from "react-toastify";
import CartItem from "./shopping cart components/CartItem";
import OrderSummary from "./shopping cart components/OrderSummary";
import OrderSummaryField from "./shopping cart components/OrderSummaryField";
import OrderSummaryFieldMobile from "./shopping cart components/OrderSummaryFieldMobile";
import CustomModal from "./shopping cart components/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useCheckout } from "helpers/checkout/checkout.context";
import { calculateCartTotal } from "utils/utility";

const CheckoutForm: NextPage = () => {
  const { cartItems, cartTotal, emptyCart, updateQty, removeFromCart } =
    React.useContext(CartContext);
  const { selectedCurr } = React.useContext(CurrencyContext);
  const { symbol, value } = selectedCurr;
  const customerId = parseInt(localStorage.getItem("id"));
  const [id, setId] = useState("");
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentCardModal, setShowPaymentCardModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showAvailableCardsModal, setShowAvailableCardsModal] = useState(false);
  const [isCardOptionSelected, setCardOptionSelected] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const { selectedPaymentMethod, setSelectedPaymentMethod } = useCheckout();

  const savedCards = [
    { id: 1, number: "XXXX XXXX 4151" },
    { id: 2, number: "XXXX XXXX 6296" },
    { id: 3, number: "XXXX XXXX 2353" },
    { id: 4, number: "XXXX XXXX 9875" },
    // Add more cards as needed
  ];
  const [coupens, setCoupens] = useState([]);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const handleShowModal2 = () => setShowModal2(true);
  const handleHideModal2 = () => setShowModal2(false);

  const handleCardOptionSelection = () => {
    setCardOptionSelected(true);
    handleShowModal2();
  };

  const handleCardSelection = (index) => {
    setSelectedCard(index);
    const selectedCardNumber = savedCards[index]?.number;
    setSelectedPaymentMethod(selectedCardNumber);
    console.log("selectedPaymentMethod", selectedPaymentMethod);
  };

  const handleCashOnDeliverySelection = () => {
    setCardOptionSelected(false);
    setSelectedPaymentMethod("COD");
    console.log("selectedPaymentMethod", selectedPaymentMethod);
  };

  useEffect(() => {
    // This effect runs whenever selectedCard changes
    const selectedCardNumber = savedCards[selectedCard]?.number;
    setSelectedPaymentMethod(selectedCardNumber);
    console.log("selectedPaymentMethod", selectedPaymentMethod);
  }, [selectedCard]); // Run the effect when selectedCard changes

  const handleShowPaymentCardModal = () => {
    setShowPaymentCardModal(true);
  };

  const handleHidePaymentCardModal = () => {
    setShowPaymentCardModal(false);
  };

  // for available cards
  const handleShowAvailableCardModal = () => {
    setShowAvailableCardsModal(true);
  };

  const handleHideAvailableCardModal = () => {
    setShowAvailableCardsModal(false);
  };

  const handleQtyUpdate = (item, quantity) => {
    const parsedQty = parseInt(quantity, 10);
    if (parsedQty >= 1) {
      setQuantityError(false);
      updateQty(item, parsedQty);
      setQuantityError(true);
    }
  };

  const [userProfileFormData, setUserProfileFormData] = useState({
    customer_id: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
    zipcode: "",
    city: "",
    country: "",
    company: "",
    image: "",
    website_link: "",
  });

  const [shippingAddressFormData, setShippingAddressFormData] = useState({
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

  useEffect(() => {
    setId(localStorage.getItem("id"));

    const loadItems = async () => {
      try {
        const response = await axios.get(`${GET_USER_PROFILE}/${id}`);
        const itemData = response.data;
        setUserProfileFormData(itemData.user_profile);
        console.log("itemData", itemData);
      } catch (error) {
        console.log(error);
      }
    };
    loadItems();
  }, [id]);

  useEffect(() => {
    setId(localStorage.getItem("id"));

    const loadItems = async () => {
      try {
        const response = await axios.get(`${GET_USER_PROFILE}/${id}`);
        const itemData = response.data;
        setShippingAddressFormData(itemData.shipping_address);
        console.log("itemData", itemData);
      } catch (error) {
        console.log(error);
      }
    };
    loadItems();
  }, [id]);

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingAddressFormData((prevShippingAddressFormData) => ({
      ...prevShippingAddressFormData,
      [name]: value,
    }));
  };

  // error messages
  const created = "Order Placed Successfully";
  const errorMessage = "Something Bad Happened";

  const notifyCreate = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     customer_id: id,
  //     first_name: shippingAddressFormData.first_name,
  //     last_name: shippingAddressFormData.last_name,
  //     phone: shippingAddressFormData.phone,
  //     email: shippingAddressFormData.email,
  //     company_name: shippingAddressFormData.company_name,
  //     zip_code: shippingAddressFormData.zip_code,
  //     country: shippingAddressFormData.country,
  //     city: shippingAddressFormData.city,
  //     state: shippingAddressFormData.state,
  //     address: shippingAddressFormData.address,
  //   };

  //   try {
  //     console.log("updated data", data);
  //     // send a PATCH request to the server to update the profile
  //     const response = await axios.patch(UPDATE_USER_SHIPPING_ADDRESS, data);
  //     notifyCreate(created);

  //     // handle the response and perform any necessary actions
  //     console.log(response);
  //     console.log(response.data);

  //     // reset the form
  //   } catch (error) {
  //     notifyError(errorMessage);
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await axios.get(GET_SPONSORED_PRODUCT);
        const itemData = response.data;
        setCoupens(itemData.Coupons);
        console.log("itemData", itemData);
      } catch (error) {
        console.log(error);
      }
    };
    loadItems();
  }, []);

  const shippingCharges = 30;
  const { selectedCoupons } = useCheckout();
  // Calculate total discount based on selected coupons
  const totalDiscountAmount = selectedCoupons.reduce((total, couponIndex) => {
    // Assuming you have an array of coupons with a 'percentage' field
    const coupon = coupens[couponIndex];

    // Check if coupens array has an item at the specified index
    if (coupon && typeof coupon.percentage === "string") {
      // Convert the percentage string to a number
      const couponPercentage: number = parseFloat(coupon.percentage);

      // Check if the conversion is successful and it's a valid number
      if (!isNaN(couponPercentage)) {
        // Calculate the discount amount for each coupon
        const discountAmount: number = (cartTotal * couponPercentage) / 100;
        // Add the discount amount to the total
        return total + discountAmount;
      } else {
        // Handle the case where the conversion fails
        console.error(`Invalid percentage: ${coupon.percentage}`);
        return total;
      }
    } else {
      // Handle the case where coupens array doesn't have an item at the index
      console.error(`Invalid coupon at index: ${couponIndex}`);
      return total;
    }
  }, 0);

  // Calculate the total after deducting the discount
  const grandTotal = cartTotal - totalDiscountAmount - shippingCharges;

  const totalTax = cartItems.reduce((total, product) => {
    // Assuming each product has 'Other_tax' and 'tax_charges' fields
    // const productTax = product.Other_tax + product.tax_charges;
    const productTax = 30;
    // Add the product tax to the total
    return total + productTax;
  }, 0);

  const [checkoutFormData, setCheckoutFormData] = useState({
    customer_info: {
      first_name: "",
      last_name: "",
      company: "",
      country: "",
      address_01: "",
      address_02: "",
      city: "",
      state: "",
      postal_code: "",
      phone1: "",
      phone2: "",
      email: "",
      comments: "",
      shipping_full_name: "",
      shipping_company_name: "",
      shipping_contact_number: "",
      shipping_mobile_number: "",
      shipping_address: "",
      shipping_country: "",
      shipping_city: "",
      shipping_zipcode: "",
      shipping: "",
      payment_method: "",
      status: "",
      customer_id: id,
      total_price: null,
      discount: 0,
    },
    products: [
      {
        product_id: null,
        quantity: null,
        p_price: null,
        p_vendor_id: null,
      },
      {
        product_id: null,
        quantity: null,
        p_price: null,
        p_vendor_id: null,
      },
    ],
  });

  useEffect(() => {
    setCheckoutFormData({
      customer_info: {
        first_name: userProfileFormData.first_name,
        last_name: userProfileFormData.last_name,
        company: userProfileFormData.company,
        country: userProfileFormData.country,
        address_01: userProfileFormData.address,
        address_02: "",
        city: userProfileFormData.city,
        state: shippingAddressFormData.state,
        postal_code: userProfileFormData.zipcode,
        phone1: userProfileFormData.phone,
        phone2: "",
        email: userProfileFormData.email,
        comments: "",
        shipping_full_name: `${shippingAddressFormData.first_name} ${shippingAddressFormData.last_name}`,
        shipping_company_name: shippingAddressFormData.company_name,
        shipping_contact_number: shippingAddressFormData.phone,
        shipping_mobile_number: "",
        shipping_address: shippingAddressFormData.address,
        shipping_country: shippingAddressFormData.country,
        shipping_city: shippingAddressFormData.city,
        shipping_zipcode: shippingAddressFormData.zip_code,
        shipping: shippingCharges.toString(),
        payment_method: selectedPaymentMethod,
        status: "Pending",
        customer_id: id,
        total_price: grandTotal,
        discount: 30,
      },
      products: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.qty,
        p_price: item.selectedPrice,
        p_vendor_id: item.created_by,
      })),
    });
  }, [
    userProfileFormData,
    shippingAddressFormData,
    selectedPaymentMethod,
    cartItems,
    id,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = checkoutFormData;

    try {
      console.log("updated data", data);
      // send a PATCH request to the server to update the profile
      const response = await axios.post(ORDER_CHECKOUT, data);
      notifyCreate(created);
      emptyCart();
      // handle the response and perform any necessary actions
      console.log(response);
      console.log(response.data);

      // reset the form
    } catch (error) {
      notifyError(errorMessage);
      console.error(error);
    }
  };

  return (
    <>
      <section className="cart-section section-big-py-space">
        <div className="custom-container">
          <div className="row d-flex flex-column-reverse flex-lg-row">
            <div className="col-lg-7 col-md-12 col-sm-12 mb-3 mx-auto">
              <div className="container rounded rounded-3 p-2 m-2 text-start">
                <h5
                  className="text-dark"
                  style={{ backgroundColor: "#f6f6f6" }}
                >
                  Billing Address:
                </h5>
                <p>
                  <span>{userProfileFormData.first_name}</span>&nbsp;
                  <span>{userProfileFormData.last_name}</span>&nbsp;|&nbsp;
                  <span>{userProfileFormData.phone}</span>&nbsp;|&nbsp;
                  <span>{userProfileFormData.email}</span>
                </p>
                <br />
                <p>{userProfileFormData.address}</p>
                <p>
                  {userProfileFormData.city}&nbsp;|&nbsp;
                  {userProfileFormData.country}&nbsp;|&nbsp;
                  {userProfileFormData.company}&nbsp;|&nbsp;
                  {userProfileFormData.website_link}&nbsp;|&nbsp;
                  {userProfileFormData.zipcode}
                </p>
              </div>
              <div className="container rounded rounded-3 p-2 m-2 text-start">
                <h5
                  className="text-dark"
                  style={{ backgroundColor: "#f6f6f6" }}
                >
                  Shipping Address: &nbsp;
                  <span className="cursor-pointer" onClick={handleShowModal}>
                    <i className="fas fa-edit"></i>
                  </span>
                  <CustomModal
                    show={showModal}
                    onHide={handleHideModal}
                    title="Shipping Address"
                    content={
                      <>
                        <Form className="theme-form">
                          <div className="form-row row">
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="first_name"
                                  placeholder="Enter Your name"
                                  name="first_name"
                                  value={shippingAddressFormData.first_name}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="last_name"
                                  placeholder="Last Name"
                                  name="last_name"
                                  value={shippingAddressFormData.last_name}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  placeholder="email"
                                  name="email"
                                  value={shippingAddressFormData.email}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="phone">Phone number</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="phone"
                                  placeholder="Enter your number"
                                  name="phone"
                                  value={shippingAddressFormData.phone}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="address">Address</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="address"
                                  placeholder="Enter your address"
                                  name="address"
                                  value={shippingAddressFormData.address}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="zip_code">Zip Code</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="zip_code"
                                  placeholder="Enter your zip code"
                                  name="zip_code"
                                  value={shippingAddressFormData.zip_code}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="city">city</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="city"
                                  placeholder="Enter your city"
                                  name="city"
                                  value={shippingAddressFormData.city}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="state">state</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="state"
                                  placeholder="Enter your state"
                                  name="state"
                                  value={shippingAddressFormData.state}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="country">Country</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="country"
                                  placeholder="Enter your country"
                                  name="country"
                                  value={shippingAddressFormData.country}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label htmlFor="company_name">Company</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="company_name"
                                  placeholder="Enter Your Company Name"
                                  value={shippingAddressFormData.company_name}
                                  name="company_name"
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="12" className="text-center">
                              <button
                                className="btn btn-sm btn-normal mb-lg-5 mt-3"
                                // type="submit"
                                // onClick={handleSubmit}
                                type="button"
                                onClick={handleHideModal}
                              >
                                Save
                              </button>
                            </Col>
                          </div>
                        </Form>
                      </>
                    }
                  />
                </h5>
                <p>
                  <span>{shippingAddressFormData.first_name}</span>&nbsp;
                  <span>{shippingAddressFormData.last_name}</span>&nbsp;|&nbsp;
                  <span>{shippingAddressFormData.phone}</span>&nbsp;|&nbsp;
                  <span>{shippingAddressFormData.email}</span>
                </p>
                <br />
                <p>{shippingAddressFormData.address}</p>
                <p>
                  {shippingAddressFormData.city}&nbsp;|&nbsp;
                  {shippingAddressFormData.state}&nbsp;|&nbsp;
                  {shippingAddressFormData.country}&nbsp;|&nbsp;
                  {shippingAddressFormData.zip_code}
                </p>
              </div>
              <div className="container rounded rounded-3 p-2 m-2 text-start">
                <hr
                  style={{
                    border: "1px dashed ",
                    margin: "0",
                  }}
                />
              </div>
              <div className="container rounded rounded-3 p-2 m-2 text-start">
                <h5
                  className="text-dark"
                  style={{ backgroundColor: "#f6f6f6" }}
                >
                  Payment Methods:
                </h5>
                <div className="row m-3">
                  <div className="col-5">
                    <input
                      type="checkbox"
                      className="btn-check "
                      id="btncheck1"
                      onClick={handleCashOnDeliverySelection}
                      checked={!isCardOptionSelected}
                    />
                    <label
                      className="btn"
                      style={{ background: "#0071bc", color: "#fff" }}
                      htmlFor="btncheck1"
                    >
                      <span className="border rounded">
                        {selectedPaymentMethod === "COD" ? (
                          <i className="fa fa-check p-1" aria-hidden="true"></i>
                        ) : (
                          <i
                            className="fa fa-check  p-1"
                            style={{ color: "#0071bc" }}
                            aria-hidden="true"
                          ></i>
                        )}
                      </span>
                      &nbsp; (COD) Cash on Delivery
                    </label>
                  </div>
                  <div className="col-7 d-flex">
                    <div>
                      <div>
                        <input
                          type="checkbox"
                          className="btn-check "
                          id="btncheck2"
                          checked={isCardOptionSelected}
                          onChange={handleCardOptionSelection}
                        />
                        <label
                          className="btn"
                          style={{ background: "#0071bc", color: "#fff" }}
                          htmlFor="btncheck2"
                        >
                          <span className="border rounded">
                            {selectedPaymentMethod !== "COD" ? (
                              <i
                                className="fa fa-check p-1"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              <i
                                className="fa fa-check p-1"
                                style={{ color: "#0071bc" }}
                                aria-hidden="true"
                              ></i>
                            )}
                          </span>
                          &nbsp;Credit / Debit Card
                        </label>
                      </div>
                      <span></span>
                      {selectedPaymentMethod !== "COD" && (
                        <label className="text-secondary">
                          {savedCards[selectedCard].number}
                        </label>
                      )}
                    </div>
                    <CustomModal
                      show={showModal2}
                      onHide={handleHideModal2}
                      title="Select a Card"
                      content={
                        <div
                          role="group"
                          aria-label="Basic radio toggle button group"
                        >
                          {savedCards.map((card, index) => (
                            <div className="row" key={index}>
                              <div className="col d-flex justify-content-center">
                                <input
                                  type="radio"
                                  className="btn-check text-dark"
                                  name="btnradio"
                                  id={`btnradio${index}`}
                                  disabled={!isCardOptionSelected}
                                  onChange={() => handleCardSelection(index)}
                                />
                                <label
                                  className="btn btn-outline-secondary"
                                  htmlFor={`btnradio${index}`}
                                >
                                  {card.number}
                                </label>
                              </div>
                            </div>
                          ))}
                          <div className="d-flex justify-content-center">
                            <button
                              type="button"
                              className="btn btn-light"
                              onClick={handleShowPaymentCardModal}
                              disabled={!isCardOptionSelected}
                            >
                              <FontAwesomeIcon icon={faPlusCircle} />
                              &nbsp; Add New Card
                            </button>
                          </div>
                          <CustomModal
                            show={showPaymentCardModal}
                            onHide={handleHidePaymentCardModal}
                            title="Add New Card"
                            content={
                              <>
                                <form id="addCard" method="post">
                                  <div
                                    className="btn-group d-flex mb-3"
                                    role="group"
                                  >
                                    <input
                                      type="radio"
                                      className="btn-check"
                                      name="options"
                                      id="option1"
                                      autoComplete="off"
                                      checked
                                    />
                                    <label
                                      className="btn btn-outline-secondary btn-sm shadow-none w-100"
                                      htmlFor="option1"
                                    >
                                      Debit
                                    </label>

                                    <input
                                      type="radio"
                                      className="btn-check"
                                      name="options"
                                      id="option2"
                                      autoComplete="off"
                                    />
                                    <label
                                      className="btn btn-outline-secondary btn-sm shadow-none w-100"
                                      htmlFor="option2"
                                    >
                                      Credit
                                    </label>
                                  </div>
                                  <div className="row g-3">
                                    <div className="col-12">
                                      <label
                                        htmlFor="cardType"
                                        className="form-label"
                                      >
                                        Card Type
                                      </label>
                                      <select
                                        id="cardType"
                                        className="form-select"
                                        required
                                      >
                                        <option value="">Card Type</option>
                                        <option>Visa</option>
                                        <option>MasterCard</option>
                                      </select>
                                    </div>
                                    <div className="col-12">
                                      <label
                                        htmlFor="cardNumber"
                                        className="form-label"
                                      >
                                        Card Number
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        data-bv-field="cardnumber"
                                        id="cardNumber"
                                        required
                                        // value=""
                                        placeholder="Card Number"
                                      />
                                    </div>
                                    <div className="col-lg-6">
                                      <label
                                        htmlFor="expiryDate"
                                        className="form-label"
                                      >
                                        Expiry Date
                                      </label>
                                      <input
                                        id="expiryDate"
                                        type="text"
                                        className="form-control"
                                        data-bv-field="expiryDate"
                                        required
                                        // value=""
                                        placeholder="MM/YY"
                                      />
                                    </div>
                                    <div className="col-lg-6">
                                      <label
                                        htmlFor="cvvNumber"
                                        className="form-label"
                                      >
                                        <span
                                          className="text-info ms-1"
                                          data-bs-toggle="tooltip"
                                          title=""
                                          data-bs-original-title="For Visa/Mastercard, the three-digit CVV number is printed on the signature panel on the back of the card immediately after the card's account number. For American Express, the four-digit CVV number is printed on the front of the card above the card account number."
                                          aria-label="For Visa/Mastercard, the three-digit CVV number is printed on the signature panel on the back of the card immediately after the card's account number. For American Express, the four-digit CVV number is printed on the front of the card above the card account number."
                                        >
                                          <i className="fas fa-question-circle"></i>
                                        </span>
                                      </label>
                                      <input
                                        id="cvvNumber"
                                        type="password"
                                        className="form-control"
                                        data-bv-field="cvvnumber"
                                        required
                                        // value=""
                                        placeholder="CVV (3 digits)"
                                      />
                                    </div>
                                    <div className="col-12">
                                      <label
                                        htmlFor="cardHolderName"
                                        className="form-label"
                                      >
                                        Card Holder Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        data-bv-field="cardholdername"
                                        id="cardHolderName"
                                        required
                                        // value=""
                                        placeholder="Card Holder Name"
                                      />
                                    </div>
                                    <div className="col-12 d-grid mt-4">
                                      <button
                                        className="btn btn-primary"
                                        type="submit"
                                      >
                                        Add Card
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </>
                            }
                          />
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  removeFromCart={removeFromCart}
                  handleQtyUpdate={handleQtyUpdate}
                  quantityError={quantityError}
                  coupens={coupens}
                />
              ))}
            </div>
            <div className="col-lg-4 col-md-8 col-sm-12 mb-3 mx-auto">
              <OrderSummary>
                <>
                  <>
                    {/* for laptop and above screen */}
                    <>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total"
                          price={`${symbol}${calculateCartTotal(cartItems)}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Discount Applied"
                          price={`${symbol}${totalDiscountAmount}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Tax"
                          price={`${symbol}${totalTax}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Shipping"
                          price={`${symbol}${shippingCharges}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Shipping Fee Discount"
                          price={`-${symbol}${shippingCharges}`}
                        />
                      </div>
                    </>
                    {/* for mobile screen */}
                    <>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total"
                          price={`${symbol}${cartTotal.toFixed(2)}`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total Discount Applied"
                          price={`${symbol}120`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name={`Total Tax ${"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} `}
                          price={`${symbol}54`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total Shipping"
                          price={`${symbol}30`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Shipping Fee Discount"
                          price={`-$30`}
                        />
                      </div>
                    </>
                    <div className="row d-flex justify-content-between mb-1">
                      &nbsp;
                    </div>
                    <div className="row d-flex justify-content-between mb-1">
                      &nbsp;
                    </div>
                    <div className="row d-flex justify-content-between mb-1">
                      <div className=" border-0">
                        <hr
                          style={{
                            border: "1px dashed ",
                            margin: "0",
                          }}
                        />
                      </div>
                    </div>
                    <div className="row d-flex justify-content-between mb-1">
                      &nbsp;
                    </div>
                    {/* for laptop and above screen */}
                    <div className="d-none d-sm-block">
                      <OrderSummaryField
                        name="Grand Total"
                        price={`${symbol}${grandTotal}`}
                      />
                    </div>
                    {/* for mobile screen */}
                    <div className="d-block d-sm-none">
                      <OrderSummaryFieldMobile
                        name="Grand Total"
                        price={`${symbol}${grandTotal}`}
                      />
                    </div>
                    <div>
                      <div className="row d-flex justify-content-between mb-1">
                        &nbsp;
                      </div>
                      <div className="row d-flex justify-content-between mb-1">
                        &nbsp;
                      </div>
                      <div className="d-flex justify-content-center mb-3">
                        <button
                          style={{
                            backgroundColor: "#0071bc",
                            boxShadow: "0 3px 7px 1px rgba(0,0,0,0.4)",
                          }}
                          className="w-100 btn rounded rounded-pill text-white border-0"
                          onClick={handleSubmit}
                        >
                          Place Order
                        </button>
                      </div>
                      {/* for laptop and above screen */}
                      <div
                        className="d-none d-sm-block ps-2 pe-2"
                        style={{ backgroundColor: "#fef6f3" }}
                      >
                        <OrderSummaryField
                          name="Payment Method"
                          price={selectedPaymentMethod}
                        />
                      </div>
                      {/* for mobile screen */}
                      <div className="d-block d-sm-none ps-2 pe-2">
                        <OrderSummaryFieldMobile
                          name="Payment Method"
                          price={isCardOptionSelected ? "Online" : "COD"}
                        />
                      </div>
                    </div>
                  </>
                </>
              </OrderSummary>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutForm;
