import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Row, Col, Button } from "react-bootstrap";

import DashboardComponent from "./acccountComponent/dashboardComponent";
import CartPage from "./cartPage";
import WishListPage from "views/pages/account/WishListPage";
import ReviewPage from "../revidewPage";
import ForgetPassword from "./forgetPasswordPage";
import Profile from "./profilePage";
import Address from "./addressPage";
import PaymentMethod from "./paymentPage";
import PaymentDeposit from "./PaymentDeposit";
import Link from "next/link";
import axios from "axios";
import OrderHistoryPage from "../orderHistory";
import PaymentWithdraw from "./PaymentWithdraw";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type Props = {
  userId: any;
};
const dashboardIconStyles = `
 .dashboard-icon {
   
  }
  .dashboard-icon img {
    cursor: pointer;
  }

 .dashboard-icon img {
    width: 60px;
  }

 .dashboard-icon p {
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
  }

 .account-details-button {
    margin-right: 20px;
  }
  
 .dotted-line {
    border: none;
    border-bottom: 1px dashed #000;
    flex: 1;
    margin-top: 10px;
  }

 .dashboard-icon a {
    cursor: pointer;
  }
`;

const Dashboard: NextPage<Props> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Replace with your authentication state logic
  const [userData, setUserData] = useState({});
  const router = useRouter();
  const [currentComponent, setCurrentComponent] = useState("dashboard");

  useEffect(() => {
    (async () => {
      await axios
        .get( `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    })();
  }, [userId]);

  const handleLogout = async (e) => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("order-sucess-items");
    Cookies.remove("token");
    Cookies.remove("id");
    setUserLoggedIn(false);
    router.push("/");
    toast.success("You have been Signed out successfully!");
  };

  return (
    <>
      <div>
        <div className="custom-container">
          <div className="account-details-container">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button variant="primary" className="account-details-button">
                Account Details
              </Button>
              <div className="dotted-line"></div>
            </div>
            <Row className="mx-2 my-3">
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <Link href="/mydashbord/">
                  <div className="dashboard-icon">
                    <img
                      src="/images/Dashboard Icons/My-Profile.png"
                      alt="My Profile"
                    />
                    <p>My Profile</p>
                  </div>
                </Link>
              </Col>

              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Billing-Details.png"
                    alt="Billing Details"
                  />
                  <p>Billing Details</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Shipping-Details.png"
                    alt="Shipping Details"
                  />
                  <p>Shipping Details</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div
                  className="dashboard-icon"
                  onClick={() => setCurrentComponent("cart")}
                >
                  <Link href="">
                    <div className="dashboard-icon">
                      <img
                        src="/images/Dashboard Icons/My-Cart.png"
                        alt="My-Cart"
                      />
                      <p>My-Cart</p>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div
                  className="dashboard-icon"
                  onClick={() => setCurrentComponent("wishlist")}
                >
                  <Link href="">
                    <div className="dashboard-icon">
                      <img
                        src="/images/Dashboard Icons/Wishlist.png"
                        alt="Wishlist"
                      />
                      <p>Wishlist</p>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Compare-List.png"
                    alt="Compare List"
                  />
                  <p>Compare List</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/My-Reviews.png"
                    alt="My Reviews"
                  />
                  <p>My Reviews</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Coupon-Earned.png"
                    alt="Coupon Earned"
                  />
                  <p>Coupon Earned</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div
                  className="dashboard-icon cursor-pointer"
                  onClick={handleLogout}
                >
                  <img src="/images/Dashboard Icons/Logout.png" alt="Logout" />
                  <p>Logout</p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="My-Dashboard">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button variant="primary" className="account-details-button">
                My Dashboard
              </Button>
              <div className="dotted-line"></div>
            </div>
            <Row className=" my-3 mx-2">
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Dashboard.png"
                    alt="My Dashboard"
                  />
                  <p>My Dashboard</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Message-Center.png"
                    alt="Message-Center"
                  />
                  <p>Message-Center</p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="My-Oder">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="primary"
                className="account-details-button"
                onClick={() => {
                  setIsOpen(!isOpen);
                  setCurrentComponent("order");
                }}
              >
                My Order
              </Button>
              <div className="dotted-line"></div>
            </div>
            <Row className="my-3 mx-2">
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <Link href="/orders">
                  <div className="dashboard-icon">
                    <img
                      src="/images/Dashboard Icons/All-Orders.png"
                      alt="All-Orders"
                    />
                    <p>All-Orders</p>
                  </div>
                </Link>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Pending-orders.png"
                    alt="Pending-orders"
                  />
                  <p>Pending-orders</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Cancelled-orders.png"
                    alt="Cancelled-orders"
                  />
                  <p>Cancelled-orders</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Completed-orders.png"
                    alt="Completed-orders"
                  />
                  <p>Completed-orders</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Track-your-order.png"
                    alt="/Track-your-order"
                  />
                  <p>Track-your-order</p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="E-wallet">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="primary"
                  className="account-details-button"
                  onClick={() => {
                    setIsOpen(isOpen);
                    setCurrentComponent("payment"); // Set currentComponent to "payment" when button is clicked
                  }}
                >
                  E-wallet
                </Button>
                <div className="dotted-line"></div>
              </div>
              <div className="dotted-line"></div>
            </div>
            <Row className="justify-content-start ">
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Credit--Debit-Card.png"
                    alt="Credit--Debit-Card"
                  />
                  <p>Credit--Debit-Card</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/My-Banks.png"
                    alt="My-Banks"
                  />
                  <p>My-Banks</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div
                  className={
                    currentComponent === "PaymentDeposit" ? "active" : ""
                  }
                  onClick={() => {
                    setCurrentComponent("PaymentDeposit");
                  }}
                >
                  <Link href={""}>
                    <div className="dashboard-icon">
                      <img
                        src="/images/Dashboard Icons/Deposit.png"
                        alt="Deposit"
                      />
                      <p>Deposit</p>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div
                  className={
                    currentComponent === "PaymentWithdraw" ? "active" : ""
                  }
                  onClick={() => {
                    setCurrentComponent("PaymentWithdraw");
                  }}
                >
                  <Link href={""}>
                    <div className="dashboard-icon">
                      <img
                        src="/images/Dashboard Icons/Withdraw.png"
                        alt="Withdraw"
                      />
                      <p>Withdraw</p>
                    </div>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>

          {/* Transactions */}
          <div className="Transactions">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button variant="primary" className="account-details-button">
                Transactions
              </Button>
              <div className="dotted-line"></div>
            </div>
            <Row className="mx-2 my-3">
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <Link href="/transactions-page">
                  <div className="dashboard-icon">
                    <img
                      src="/images/Dashboard Icons/All-Transactions.png"
                      alt="All-Transactions"
                    />
                    <p>All-Transactions </p>
                  </div>
                </Link>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Total-Deposit.png"
                    alt="Total-Deposit"
                  />
                  <p>Total-Deposit</p>
                </div>
              </Col>

              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Total-Withdrawal.png"
                    alt="Total-Withdrawal"
                  />
                  <p>Total-Withdrawal</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Total-Refund.png"
                    alt="Total-Refund"
                  />
                  <p>Total-Refund</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Total-Buying.png"
                    alt="Total-Buying"
                  />
                  <p>Total-Buying</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Total-Cancelled.png"
                    alt="Total-Cancelled"
                  />
                  <p>Total-Cancelled</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Total-Pendings.png"
                    alt="Total-Pendings"
                  />
                  <p>Total-Pendings</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Completed.png"
                    alt="Completed"
                  />
                  <p>Completed</p>
                </div>
              </Col>
            </Row>
          </div>
          <div className="Setting">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button variant="primary" className="account-details-button">
                Setting
              </Button>
              <div className="dotted-line"></div>
            </div>
            <Row className="my-3 mx-2">
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Settings.png"
                    alt="Settings"
                  />
                  <p>Settings</p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="Support Center">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button variant="primary" className="account-details-button">
                Support Center
              </Button>
              <div className="dotted-line"></div>
            </div>
            <Row className="mx-2 my-3">
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Support-24-7.png"
                    alt="Live Chat"
                  />
                  <p>Live Chat</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <Link href="/footer/contact-us-form-page">
                  <div className="dashboard-icon">
                    <img
                      src="/images/Dashboard Icons/contact us.png"
                      alt="contact"
                    />
                    <p>Contact us</p>
                  </div>
                </Link>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  {" "}
                  <img src="/images/Dashboard Icons/FAQ.png" alt="FAQ" />
                  <p>FAQ</p>
                </div>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <div className="dashboard-icon">
                  <img
                    src="/images/Dashboard Icons/Submit-a-Report.png"
                    alt="Submit a report"
                  />
                  <p>Submit a report </p>
                </div>
              </Col>

              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <Link href="/openDispute-page">
                  <div className="dashboard-icon">
                    <img
                      src="/images/Dashboard Icons/open-dispute-icon.png"
                      alt="Open-Dispute.png"
                    />
                    <p>Open-Dispute</p>
                  </div>
                </Link>
              </Col>

              <Col xs={6} sm={4} md={3} lg={3} xl={1}>
                <Link href="/openDispute-page">
                  <div className="dashboard-icon">
                    <img
                      src="/images/Dashboard Icons/Contact-Supplier.png"
                      alt="Contact Supplier"
                    />
                    <p>Contact Supplier</p>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
        <style jsx>{dashboardIconStyles}</style>
      </div>

      {/* dashoard and side bar */}
      <section className="section-big-py-space bg-light custom-container ">
        <div className="custom-container">
          <Row>
            <Col lg="3" className="m-0 p-0 mb-5">
              <div
                className="account-sidebar"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <a className="popup-btn">my account</a>
              </div>
              <div
                className={`dashboard-left`}
                style={{
                  left: isOpen ? "0px" : "",
                }}
              >
                <div className="collection-mobile-back">
                  <span
                    className="filter-back"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <i className="fa fa-angle-left" aria-hidden="true"></i> back
                  </span>
                </div>
                <div className="block-content w-100 ">
                  <ul className="">
                    <li
                      className={
                        currentComponent === "dashboard" ? "active" : ""
                      }
                      onClick={() => {
                        setCurrentComponent("dashboard");
                      }}
                    >
                      <Link href={""}>Dashboard</Link>
                    </li>
                    <li
                      className={currentComponent === "order" ? "active" : ""}
                      onClick={() => {
                        setCurrentComponent("order");
                      }}
                    >
                      <Link href={""}>My Orders</Link>
                    </li>
                    <li
                      className={currentComponent === "account" ? "active" : ""}
                    >
                      <div className="dropdown">
                        <span
                          className={
                            currentComponent === "dashboard" ? "active" : ""
                          }
                          onClick={() => {
                            setCurrentComponent("dashboard");
                          }}
                        >
                          <Link href={""}>Account</Link>
                        </span>{" "}
                        <ul className="submenu">
                          <li
                            className={
                              currentComponent === "profile" ? "active" : ""
                            }
                            onClick={() => {
                              setCurrentComponent("profile");
                            }}
                          >
                            <Link href={""}>Profile</Link>
                          </li>
                          <li
                            className={
                              currentComponent === "address" ? "active" : ""
                            }
                            onClick={() => {
                              setCurrentComponent("address");
                            }}
                          >
                            <Link href={""}>Address</Link>
                          </li>
                          <li
                            className={
                              currentComponent === "payment" ? "active" : ""
                            }
                            onClick={() => {
                              setCurrentComponent("payment");
                            }}
                          >
                            <Link
                              href={""}
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              Payment Method And E-Wallet
                            </Link>
                          </li>
                          <li
                            className={
                              currentComponent === "PaymentDeposit"
                                ? "active"
                                : ""
                            }
                            onClick={() => {
                              setCurrentComponent("PaymentDeposit");
                            }}
                          >
                            <Link href={""}>Payment Deposit</Link>
                          </li>

                          <li
                            className={
                              currentComponent === "PaymentWithdraw"
                                ? "active"
                                : ""
                            }
                            onClick={() => {
                              setCurrentComponent("PaymentWithdraw");
                            }}
                          >
                            <Link href={""}>Payment Withdraw</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li
                      className={
                        currentComponent === "wishlist" ? "active" : ""
                      }
                      onClick={() => {
                        setCurrentComponent("wishlist");
                      }}
                    >
                      <Link href={""}>Wishlist</Link>
                    </li>
                    <li
                      className={currentComponent === "cart" ? "active" : ""}
                      onClick={() => {
                        setCurrentComponent("cart");
                      }}
                    >
                      <Link href={""}>Cart</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg="9">
              <div className="dashboard-right">
                {userId ? (
                  <div className="dashboard">
                    {currentComponent === "dashboard" && <DashboardComponent />}
                    {currentComponent === "order" && <OrderHistoryPage />}
                    {currentComponent === "cart" && <CartPage />}
                    {currentComponent === "wishlist" && <WishListPage />}
                    {currentComponent === "reviews" && (
                      <ReviewPage userData={userData} />
                    )}

                    {currentComponent === "changePassword" && (
                      <ForgetPassword />
                    )}
                    {currentComponent === "PaymentDeposit" && (
                      <PaymentDeposit userData={userData} />
                    )}
                    {currentComponent === "PaymentWithdraw" && (
                      <PaymentWithdraw userData={userData} />
                    )}
                    {currentComponent === "profile" && <Profile />}
                    {currentComponent === "address" && <Address />}
                    {currentComponent === "payment" && (
                      <PaymentMethod userData={userData} />
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="p-5">Please Login or Signup First 😴</h2>
                    <div className="pb-5">
                      <Link href="/pages/account/login">
                        <Button className="m-2" color="btn btn-rounded">
                          Login
                        </Button>
                      </Link>
                      <Link href="/pages/account/register">
                        <Button
                          className="m-2"
                          color="btn  btn-rounded btn-outline"
                        >
                          Signup
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
