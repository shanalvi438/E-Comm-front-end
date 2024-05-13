import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "utils/utility";
import { CurrencyContext } from "helpers/currency/CurrencyContext";
import { useRouter } from "next/router";
import OrderedItem from "./account/checkoutWizard/shopping cart components/OrderedItem";
import OrderSummary from "./account/checkoutWizard/shopping cart components/OrderSummary";
import OrderSummaryField from "./account/checkoutWizard/shopping cart components/OrderSummaryField";
import OrderSummaryFieldMobile from "./account/checkoutWizard/shopping cart components/OrderSummaryFieldMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

interface Order {
  id: null;
  date: "";
  o_vendor_id: null;
  first_name: "";
  last_name: "";
  company: "";
  country: "";
  address_01: "";
  address_02: null;
  city: "";
  state: "";
  postal_code: "";
  phone1: "";
  phone2: null;
  email: "";
  comments: null;
  payment_method: "";
  status: "";
  shipping: 0;
  shipping_full_name: "";
  shipping_company_name: "";
  shipping_email: null;
  shipping_contact_number: "";
  shipping_address: "";
  shipping_city: "";
  shipping_state: null;
  shipping_country: "";
  shipping_zipcode: "";
  updatedby: null;
  customer_id: null;
  created_at: "";
  updated_at: "";
  total_price: 0;
  discount: 0;
  product_orders_details: [
    {
      product_details: {
        tax_title: null;
        tax_type: null;
        tax_charges: 0;
      };
    }
  ];
}

const OrderDetails = () => {
  const router = useRouter();
  const { specificOrderId } = router.query;
  const orderId = Array.isArray(specificOrderId)
    ? parseInt(specificOrderId[0], 10)
    : parseInt(specificOrderId, 10);

  const [id, setId] = useState("");
  const [data, setData] = useState({ orders: [], orderTrackerByProduct: [] });
  const [order, setOrder] = useState<Order>();
  const [totalTax, settotalTax] = useState(0);

  useEffect(() => {
    setId(localStorage.getItem("id"));
    const loadItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${id}/orders`
        );
        const responseData = response.data;
        setData(responseData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    loadItems();
  }, [id]);

  useEffect(() => {
    console.log("specificOrderId:", specificOrderId);
    console.log("orders:", data.orders);
    console.log("checking: ", data.orders[0]?.id == specificOrderId);
    for (let i = 0; i < data.orders.length; i++) {
      if (data.orders[i].id == specificOrderId) {
        setOrder(data.orders[i]);
        console.log("filtered order:", order);
      }
    }
    if (data) {
      let totalTaxAmount = 0;
      for (let i = 0; i < order?.product_orders_details?.length; i++) {
        totalTaxAmount +=
          order?.product_orders_details[i]?.product_details?.tax_charges;
      }
      settotalTax(totalTaxAmount);
    }
  }, [data, specificOrderId]);

  const shippingDiscount = -30;

  return (
    <>
      <section className="cart-section section-big-py-space">
        <div className="custom-container">
          <div className="row">
            <div className="col">
              <div className="row d-flex justify-content-between mb-3 border-2 border-bottom pb-2">
                <div className="col d-flex align-items-center">
                  <p>
                    <span className="text-dark">Order ID #::</span> {order?.id}
                  </p>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <span className="d-flex justify-content-end">
                      <p className="me-3 mt-1">
                        <span className="text-dark">Order Placed On:</span>{" "}
                        {formatDate(order?.created_at)}
                      </p>
                      <button className="btn btn-sm color-bg-blue mb-2 me-2 text-white shadow">
                        <FontAwesomeIcon icon={faPrint} />
                        &nbsp; Print Invoice
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  <span>{order?.first_name}</span>&nbsp;
                  <span>{order?.last_name}</span>&nbsp;|&nbsp;
                  <span>{order?.phone1}</span>&nbsp;|&nbsp;
                  <span>{order?.email}</span>
                </p>
                <br />
                <p>{order?.address_01}</p>
                <p>
                  {order?.city}&nbsp;|&nbsp;
                  {order?.country}&nbsp;|&nbsp;
                  {order?.company}&nbsp;|&nbsp;
                  {order?.shipping_zipcode}
                </p>
              </div>
              <div className="container rounded rounded-3 p-2 m-2 text-start">
                <h5
                  className="text-dark"
                  style={{ backgroundColor: "#f6f6f6" }}
                >
                  Shipping Address:
                </h5>
                <p>
                  <span>{order?.first_name}</span>&nbsp;
                  <span>{order?.last_name}</span>&nbsp;|&nbsp;
                  <span>{order?.phone1}</span>&nbsp;|&nbsp;
                  <span>{order?.email}</span>
                </p>
                <br />
                <p>{order?.shipping_address}</p>
                <p>
                  {order?.city}&nbsp;|&nbsp;
                  {order?.state}&nbsp;|&nbsp;
                  {order?.country}&nbsp;|&nbsp;
                  {order?.shipping_zipcode}
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
                  <div className="col-4">
                    <input
                      type="checkbox"
                      className="btn-check "
                      id="btncheck1"
                      checked={true}
                      disabled
                    />
                    <label className="btn btn-secondary" htmlFor="btncheck1">
                      <span className="border rounded">
                        {order?.payment_method?.toUpperCase() === "COD" ? (
                          <i className="fa fa-check p-1" aria-hidden="true"></i>
                        ) : (
                          <i
                            className="fa fa-check p-1 text-secondary"
                            aria-hidden="true"
                          ></i>
                        )}
                      </span>
                      &nbsp; (COD) Cash on Delivery
                    </label>
                  </div>
                  <div className="col-8 d-flex">
                    <div>
                      <div>
                        <input
                          type="checkbox"
                          className="btn-check "
                          id="btncheck2"
                          checked={
                            order?.payment_method?.toUpperCase() !== "COD"
                          }
                          disabled
                        />
                        <label
                          className="btn btn-secondary"
                          htmlFor="btncheck2"
                        >
                          <span className="border rounded">
                            {order?.payment_method?.toUpperCase() !== "COD" ? (
                              <i
                                className="fa fa-check p-1"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              <i
                                className="fa fa-check p-1 text-secondary"
                                aria-hidden="true"
                              ></i>
                            )}
                          </span>
                          &nbsp;Credit / Debit Card
                        </label>
                      </div>
                      <span></span>
                      {order?.payment_method?.toUpperCase() !== "COD" && (
                        <label className="text-secondary">
                          {order?.payment_method?.toUpperCase() !== "COD"
                            ? "Online"
                            : ""}
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {order?.product_orders_details?.map((orderProductDetails, i) => (
                <OrderedItem
                  key={i}
                  item={orderProductDetails.product_details}
                  orderProductDetails={orderProductDetails}
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
                          price={`$${order?.total_price}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Discount Applied"
                          price={`$${order?.discount}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Tax"
                          price={`$${totalTax}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Total Shipping"
                          price={`$${order?.shipping}`}
                        />
                      </div>
                      <div className="d-none d-sm-block">
                        <OrderSummaryField
                          name="Shipping Fee Discount"
                          price={`$${shippingDiscount}`}
                        />
                      </div>
                    </>
                    {/* for mobile screen */}
                    <>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total"
                          price={`$${order?.total_price}`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total Discount Applied"
                          price={`$${order?.discount}`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name={`Total Tax ${"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} `}
                          price={`$${totalTax}`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Total Shipping"
                          price={`$${order?.shipping}`}
                        />
                      </div>
                      <div className="d-block d-sm-none">
                        <OrderSummaryFieldMobile
                          name="Shipping Fee Discount"
                          price={`$${shippingDiscount}`}
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
                        price={
                          totalTax +
                          order?.total_price +
                          order?.discount +
                          shippingDiscount
                        }
                      />
                    </div>
                    {/* for mobile screen */}
                    <div className="d-block d-sm-none">
                      <OrderSummaryFieldMobile
                        name="Grand Total"
                        price={
                          totalTax +
                          order?.total_price +
                          order?.discount +
                          shippingDiscount
                        }
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
                          className="w-100 btn btn-secondary rounded rounded-pill text-white border-0"
                          disabled
                        >
                          Order Placed
                        </button>
                      </div>
                      {/* for laptop and above screen */}
                      <div
                        className="d-none d-sm-block ps-2 pe-2"
                        style={{ backgroundColor: "#fef6f3" }}
                      >
                        <OrderSummaryField
                          name="Payment Method"
                          price={
                            order?.payment_method?.toUpperCase() !== "COD"
                              ? "Online"
                              : "COD"
                          }
                        />
                      </div>
                      {/* for mobile screen */}
                      <div className="d-block d-sm-none ps-2 pe-2">
                        <OrderSummaryFieldMobile
                          name="Payment Method"
                          price={
                            order?.payment_method?.toUpperCase() !== "COD"
                              ? "Online"
                              : "COD"
                          }
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

export default OrderDetails;
