import React from "react";
import { NextPage } from "next";

import Layout1 from "../../views/layouts/layout1";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

const dashboardIconStyles = `
  .dashboard-icon {
   
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
`;

const Dashboardlayout: NextPage = () => {
  return (
    <Layout1>
      <div className="custom-container">
        <div className="account-details-container">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button variant="primary" className="account-details-button">
              Account Details
            </Button>
            <div className="dotted-line"></div>
          </div>
          <Row className="justify-content-space-between">
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
              <div className="dashboard-icon">
                <img src="/images/Dashboard Icons/My-Cart.png" alt="My Cart" />
                <p>My Cart</p>
              </div>
            </Col>
            <Col xs={6} sm={4} md={3} lg={3} xl={1}>
              <div className="dashboard-icon">
                <img
                  src="/images/Dashboard Icons/Wishlist.png"
                  alt="Wishlist"
                />
                <p>Wishlist</p>
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
              <div className="dashboard-icon">
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
          <Row className="justify-content-space-between">
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
            <Button variant="primary" className="account-details-button">
              My Oder
            </Button>
            <div className="dotted-line"></div>
          </div>
          <Row className="justify-content-space-between">
            <Col xs={6} sm={4} md={3} lg={3} xl={1}>
              <div className="dashboard-icon">
                <img
                  src="/images/Dashboard Icons/All-Orders.png"
                  alt="All-Orders"
                />
                <p>All-Orders</p>
              </div>
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
            <Button variant="primary" className="account-details-button">
              E-wallet
            </Button>
            <div className="dotted-line"></div>
          </div>
          <Row className="justify-content-space-between">
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
              <div className="dashboard-icon">
                <img src="/images/Dashboard Icons/Deposit.png" alt="Deposit" />
                <p>Deposit</p>
              </div>
            </Col>
            <Col xs={6} sm={4} md={3} lg={3} xl={1}>
              <div className="dashboard-icon">
                <img
                  src="/images/Dashboard Icons/Withdraw.png"
                  alt="Withdraw"
                />
                <p>Withdraw</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="Transaction">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button variant="primary" className="account-details-button">
              Transaction
            </Button>
            <div className="dotted-line"></div>
          </div>
          <Row className="justify-content-space-between">
            <Col xs={6} sm={4} md={3} lg={3} xl={1}>
              <div className="dashboard-icon">
                {/* <Link href="/transactions-page">
                  <>
                    <img
                      src="/images/Dashboard Icons/All-Transactions.png"
                      alt="All-Transactions."
                    />
                    <p>All-Transactions</p>
                  </>
                </Link> */}
              </div>
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
                <img src="/images/Dashboard Icons/Deposit.png" alt="Deposit" />
                <p>Deposit</p>
              </div>
            </Col>
            <Col xs={6} sm={4} md={3} lg={3} xl={1}>
              <div className="dashboard-icon">
                <img
                  src="/images/Dashboard Icons/Withdraw.png"
                  alt="Withdraw"
                />
                <p>Withdraw</p>
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
          <Row className="justify-content-space-between">
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
          <Row className="justify-content-space-between">
            <Col xs={6} sm={4} md={3} lg={3} xl={1}>
              <div className="dashboard-icon">
                <img
                  src="/images/Dashboard Icons/Support-24-7.png"
                  alt="Support-24-7"
                />
                <p>Support-24-7</p>
              </div>
            </Col>
            <Col xs={6} sm={4} md={3} lg={3} xl={1}>
              <div className="dashboard-icon">
                <img
                  src="/images/Dashboard Icons/Open-Dispute.png"
                  alt="Open-Dispute.png"
                />
                <p>Open-Dispute</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <style jsx>{dashboardIconStyles}</style>
    </Layout1>
  );
};

export default Dashboardlayout;
