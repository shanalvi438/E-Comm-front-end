import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import OrderedItem from "./account/checkoutWizard/shopping cart components/OrderedItem";
import { formatDate } from "utils/utility";
import { Dropdown, Form } from "react-bootstrap";
import Link from "next/link";

const OrderHistory: NextPage = () => {
  const [data, setData] = useState({ orders: [], orderTrackerByProduct: [] });
  const [statuses, setStatuses] = useState([]);
  const router = useRouter();
  const [id, setId] = useState("");
  const [maxWidthForOrderedItem, setMaxWidthForOrderedItem] = useState("70%");

  useEffect(() => {
    const handleResizeForTopBigImage = () => {
      // Adjust max-width based on window width
      if (window.innerWidth >= 1024) {
        setMaxWidthForOrderedItem("90%");
      } else if (window.innerWidth >= 768) {
        setMaxWidthForOrderedItem("100%");
      } else {
        setMaxWidthForOrderedItem("100%");
      }
    };

    // Initial setup
    handleResizeForTopBigImage();

    // Attach event listener for window resize
    window.addEventListener("resize", handleResizeForTopBigImage);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResizeForTopBigImage);
    };
  }, []);

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
    console.log(data?.orders[0]?.product_orders_details);
  }, [data]);

  const [selectedStatus, setSelectedStatus] = useState("All Orders");

  const countStatus = (statusName: string) => {
    return data.orders.reduce((count, order) => {
      const packagingProducts = order.product_orders_details.filter(
        (product) => product.status === statusName
      );
      return count + packagingProducts.length;
    }, 0);
  };

  useEffect(() => {
    const allOrders = data.orders.length;

    const packaging = countStatus("Packaging");
    const inProcess = countStatus("In Process");
    const confirmed = countStatus("Confirmed");
    const outForDelivery = countStatus("Out For Delivery");
    const delivered = countStatus("Delivered");
    const failedToDeliver = countStatus("Failed to Deliver");
    const returned = countStatus("Returned");
    const cancelled = countStatus("Cancelled");

    setStatuses([
      {
        name: "All Orders",
        value: allOrders,
      },
      {
        name: "In Process",
        value: inProcess,
      },
      {
        name: "Packaging",
        value: packaging,
      },
      {
        name: "Out for Delivery",
        value: outForDelivery,
      },
      {
        name: "Delivered",
        value: delivered,
      },
      {
        name: "Failed to Deliver",
        value: failedToDeliver,
      },
      {
        name: "Cancelled",
        value: cancelled,
      },
    ]);
  }, [data]);

  const filteredContents =
    selectedStatus === "All Orders"
      ? data.orders
      : data.orders.map((order) => ({
          ...order,
          product_orders_details: order.product_orders_details.filter(
            (orderProductDetails) =>
              orderProductDetails.status === selectedStatus
          ),
        }));

  useEffect(() => {
    console.log("filteredContents: ", filteredContents);
  }, [filteredContents]);

  return (
    <div className="container-fluid" style={{ backgroundColor: "#f6f6f6" }}>
      <div className="row d-flex flex-column">
        <div className="col">
          {/* for laptop and above screen */}
          <div className="col text-center d-none d-sm-block">
            <ul className="nav justify-content-center">
              {statuses?.map((status) => (
                <li className="nav-item">
                  <a
                    onClick={() => setSelectedStatus(status.name)}
                    style={{
                      borderBottomColor:
                        status.name === selectedStatus
                          ? "#0071bc"
                          : "transparent",
                      borderBottomWidth: "4px", // Adjust the border width as needed
                      borderBottomStyle: "solid",
                      display: "inline-block", // Prevents the link from taking full width
                      padding: "10px 15px", // Add padding to maintain spacing
                      textDecoration: "none", // Remove default underline
                    }}
                    className={`nav-link active fs-6 fw-bold `}
                    aria-current="page"
                    href="#"
                  >
                    <span className="text-secondary">{`${status.name} (${status.value})`}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* for mobile screen */}
          <div className="col text-center d-block d-sm-none">
            <Form.Select
              aria-label="Filter Orders Status"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses?.map((status) => (
                <option value={status.name}>
                  {status.name}
                  {` (${status.value})`}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div
            className="col-lg-6 col-md-12 col-sm-12"
            style={{ width: `${maxWidthForOrderedItem}` }}
          >
            {filteredContents?.map((order, i) => (
              <div key={i} className="pt-3 pb-3 ps-5 pe-5 mt-3 mb-5 bg-white">
                <div className="row d-flex justify-content-between mb-3 border-2 border-bottom pb-2">
                  <div className="col d-flex align-items-center">
                    <p>
                      <span className="text-dark">Order ID #::</span> {order.id}
                    </p>
                  </div>
                  <div className="row d-flex justify-content-end align-items-center">
                    <div className="col">
                      <p className="me-3">
                        <span className="text-dark">Order Placed On:</span>{" "}
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="col">
                      <div className="row d-flex justify-content-end">
                        <div className="col text-end">
                          <button className="btn btn-sm color-bg-blue mb-2 me-2 text-white shadow">
                            <FontAwesomeIcon icon={faPrint} />
                            &nbsp; Print Invoice
                          </button>
                          <Link
                            href={{
                              pathname: "/orders/order-details",
                              query: {
                                specificOrderId: order.id.toString(),
                              },
                            }}
                          >
                            <button className="btn btn-sm color-bg-blue mb-2 text-white shadow">
                              View More
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-8">
                    {order.product_orders_details?.map(
                      (orderProductDetails, i) => (
                        <OrderedItem
                          key={i}
                          item={orderProductDetails.product_details}
                          orderProductDetails={orderProductDetails}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
