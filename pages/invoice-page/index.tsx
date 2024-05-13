import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTty,
  faPhone,
  faEnvelope,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  const [showPrint, setShowPrint] = useState(
    !window.matchMedia("print").matches
  );
  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth <= 576); // Bootstrap's xs breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsXsScreen(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const rowStyle: React.CSSProperties = isXsScreen
    ? {}
    : {whiteSpace: "nowrap", fontSize: '0.9rem'  };

  return (
    
    <div className="custom-container">
{showPrint && (
        <div className="btn-print  d-print-none mt-5">
          
          </div>
      )}

      <div className={`invoice ${showPrint ? "invoice-print" : ""}`}>
        {/* customer details..... */}
        <Row className="">
          <div className=" customer row   ">
            <div className=" col-9 ">
              <div
                className="line w-100  "
                style={{
                  backgroundColor: "var(--theme-color1)",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  width: "100%",
                  color: "white",
                  border: "2px solid black",
                }}
              >
                Customer Details
              </div>
            </div>
          </div>
          <Col xs={4} sm={3} md={1}>
            <Row>
              <strong>Customer Id #:</strong>
            </Row>
            <Row>
              <strong>Customer Name:</strong>
            </Row>
            <Row>
              <strong>Company:</strong>
            </Row>

            <Row>
              <strong>City:</strong>
            </Row>
            <Row>
              <strong>Country:</strong>
            </Row>
            <Row>
              <strong>Postal Code:</strong>
            </Row>
            <Row>
              <strong>Billing Address:</strong>
            </Row>
          </Col>
          <Col xs={8} sm={3} md={6} className="">
            <Row>203</Row>
            <Row>Haseeb</Row>
            <Row>Voltonic</Row>
            <Row>LAHORE</Row>
            <Row>PAKISTAN</Row>
            <Row>554760</Row>
            <Row className="w-100" style={rowStyle}>
              21km Off Lahore - Kasur Rd, Green Cap Housing Scheme, Masjid
              Ibrahim
            </Row>
          </Col>
          <Col xs={6} sm={3} md={2}>
            <div className="text-start ">
              <div>
                <span className="mx-2">
                  <FontAwesomeIcon icon={faTty} />
                </span>
                <span>123-456789-000000</span>
              </div>
              <div>
                <span className="mx-2">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <span>123-456-789-000</span>
              </div>
              <div>
                <span className="mx-2">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span>info@voltonic.net</span>
              </div>
              <div>
                <span className="mx-2">
                  <FontAwesomeIcon icon={faGlobe} />
                </span>
                <span>www.voltonic.net</span>
              </div>
            </div>
          </Col>
          <Col xs={6} sm={3} md={2}>
            <div className="mx-3">
              <span>
                <strong>
                  Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </strong>
                30-01-2024
              </span>
              <p>
                <strong>Invoice # :</strong> 30-01-2024
              </p>
              <div className="img-print col-5">
                <img
                  src="/images/Invoice .png"
                  alt=""
                  className="w-100 .img-print"
                />
              </div>
            </div>
          </Col>
          <hr />
        </Row>
        {/* description..... */}

        <Row>
          <div className=" col-12 ">
            <div
              className="line w-100  "
              style={{
                backgroundColor: "var(--theme-color1)",
                fontSize: "0.9rem",
                fontWeight: "bold",
                width: "100%",
                color: "white",
                border: "2px solid black",
              }}
            >
              Product Details
            </div>
          </div>
          <Row>
            <Row className="">
              <Col md={1} xs={1} sm={1}>
                <strong>Sr#</strong>
              </Col>
              <Col md={2} xs={2} sm={1}>
                <strong>Product</strong>
              </Col>
              <Col md={5} xs={5} sm={6} className="">
                <strong>Description</strong>
              </Col>
              <Col md={1} xs={1} sm={1}>
                <strong>SKU</strong>
              </Col>
              <Col md={1} xs={1} sm={1}>
                <strong>QTY</strong>
              </Col>
              <Col md={1} xs={1} sm={1}>
                <strong>Price</strong>
              </Col>
              <Col md={1} xs={1} sm={1}>
                <strong>Total</strong>
              </Col>
              <hr />
            </Row>
          </Row>
          <Row className="">
            <Col md={1} xs={1} sm={1} className="">
              1
            </Col>
            <Col md={1} xs={2} sm={1} className="">
              <div className="w-100 ">
                <img
                  src="/images/movile-pic.jpg"
                  alt="img"
                  className="print-image col-sm-12 w-100  mx-sm-auto"
                />
              </div>
            </Col>
            <Col md={6} xs={5} sm={6}>
              <Row>
                <strong>
                  Rocketwell ControlLogix 5570 PLC Rocketwell ControllLogix 5570
                  Rocketwell ControlLoix 5570 PLC
                </strong>
                <p>
                  79-132 VAC Diagnostic Input 8 Pts (20).79-132
                  <br />
                  VAC Diagnostic Input 8 Pts (20).
                </p>
                <div
                  style={{
                    borderTop: "2px solid #ccc",
                  }}
                ></div>
              </Row>

              <Row>
                <Col md={9} sm={9} xs={12}>
                  <Row>
                    <strong>Estimated Delivery Between</strong>
                  </Row>
                  <Row>Saturday, Jan 2024 | Tuesday, Feb 01 2024</Row>
                </Col>
                <Col md={3} sm={3} xs={12}>
                  <Row>
                    <strong>Tracking NO.</strong>
                    <Row>4846215685</Row>
                  </Row>
                </Col>
              </Row>
              <Row className="" style={rowStyle}>
                <Col sm={5} md={4} xs={12}>
                  <Row>
                    <strong>Coupon Discount US $</strong>
                  </Row>
                  <Row>20%_US $ 180.00</Row>
                </Col>
                <Col sm={3} md={4} xs={12}>
                  <Row>
                    <strong>TAX US $</strong>
                  </Row>
                  <Row> US $ 50.00</Row>
                </Col>
                <Col sm={4} md={4} xs={12}>
                  <Row>
                    <strong>Shipping Charges US $</strong>
                  </Row>
                  <Row>US $ 50.00</Row>
                </Col>
              </Row>
            </Col>
            <Col md={1} xs={1} sm={1}>
              abc
            </Col>
            <Col md={1} xs={1} sm={1}>
              abc
            </Col>
            <Col md={1} xs={1} sm={1}>
              abc
            </Col>
            <Col md={1} xs={1} sm={1}>
              abc
            </Col>
            <hr />
          </Row>
          <Row className="">
            <Col md={1} xs={1} sm={1} className="">
              1
            </Col>
            <Col md={1} xs={2} sm={1} className="">
              <div className="w-100 ">
                <img
                  src="/images/movile-pic.jpg"
                  alt="img"
                  className="print-image col-sm-12 w-100  mx-sm-auto"
                />
              </div>
            </Col>
            <Col md={6} xs={5} sm={6}>
              <Row>
                <strong>
                  Rocketwell ControlLogix 5570 PLC Rocketwell ControllLogix 5570
                  Rocketwell ControlLoix 5570 PLC
                </strong>
                <p>
                  79-132 VAC Diagnostic Input 8 Pts (20).79-132
                  <br />
                  VAC Diagnostic Input 8 Pts (20).
                </p>
                <div
                  style={{
                    borderTop: "2px solid #ccc",
                  }}
                ></div>
              </Row>

              <Row>
                <Col md={9} sm={9} xs={12}>
                  <Row>
                    <strong>Estimated Delivery Between</strong>
                  </Row>
                  <Row>Saturday, Jan 2024 | Tuesday, Feb 01 2024</Row>
                </Col>
                <Col md={3} sm={3} xs={12}>
                  <Row>
                    <strong>Tracking NO.</strong>
                    <Row>4846215685</Row>
                  </Row>
                </Col>
              </Row>
              <Row className="" style={rowStyle}>
                <Col sm={5} md={4} xs={12}>
                  <Row>
                    <strong>Coupon Discount US $</strong>
                  </Row>
                  <Row>20%_US $ 180.00</Row>
                </Col>
                <Col sm={3} md={4} xs={12}>
                  <Row>
                    <strong>TAX US $</strong>
                  </Row>
                  <Row> US $ 50.00</Row>
                </Col>
                <Col sm={4} md={4} xs={12}>
                  <Row>
                    <strong>Shipping Charges US $</strong>
                  </Row>
                  <Row>US $ 50.00</Row>
                </Col>
              </Row>
            </Col>
            <Col md={1} xs={1} sm={1}>
              abc
            </Col>
            <Col md={1} xs={1} sm={1}>
              abc
            </Col>
            <Col md={1} xs={1} sm={1}>
              abc
            </Col>
            <Col md={1} xs={1} sm={1}>
              abc
            </Col>
            <hr />
          </Row>
        </Row>

        <Row>
          <div className="col-12">
            <div
              className="line w-100  "
              style={{
                backgroundColor: "var(--theme-color1)",
                fontSize: "0.9rem",
                fontWeight: "bold",
                color: "white",
                border: "2px solid black",
              }}
            >
              Shipping Address
            </div>
          </div>
          <Col xs={2} md={2} sm={2}>
            <strong>Customer Name</strong>
          </Col>
          <Col xs={3} md={2} sm={2}>
            <strong>Customer Name</strong>
          </Col>
          <Col xs={3} md={3} sm={3}>
            <strong>Customer Details</strong>
          </Col>
          <Col xs={4} md={5} sm={5}>
            <strong>Shipping Address</strong>
          </Col>{" "}
          <hr />
          <Row>
            <Col xs={2} md={2} sm={2}>
              Haseeb
            </Col>
            <Col xs={3} md={2} sm={2}>
              VOLTONIC SOLUTION PVT.LTD
            </Col>
            <Col xs={3} md={3} sm={3}>
              <div>
                <div>
                  <span className="mx-2">
                    <FontAwesomeIcon icon={faTty} />
                  </span>
                  <span>123-456789-000000</span>
                </div>
                <div>
                  <span className="mx-2">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <span>123-456-789-000</span>
                </div>
                <div>
                  <span className="mx-2">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <span>info@voltonic.net</span>
                </div>
                <div>
                  <span className="mx-2">
                    <FontAwesomeIcon icon={faGlobe} />
                  </span>
                  <span>www.voltonic.net</span>
                </div>
              </div>
            </Col>
            <Col xs={4} md={5} sm={5}>
              <p style={rowStyle} >
                21km Off Lahore - Kasur Rd, Green Cap Housing Scheme, Masjid
              </p>
            </Col>
          </Row>
        </Row>

        {/* Payment Summary */}
        <Row>
          <div className="col-12">
            <div
              className="line w-100  "
              style={{
                backgroundColor: "var(--theme-color1)",
                fontSize: "0.9rem",
                fontWeight: "bold",
                color: "white",
                border: "2px solid black",
              }}
            >
              Payment Summary
            </div>
          </div>

          <Row>
            <Col>
              <strong>Total</strong>
            </Col>
            <Col>
              <strong>Total Coupon Discount US $ </strong>
            </Col>
            <Col>
              <strong> Total Tax US $</strong>
            </Col>
            <Col>
              <strong> Total Shipping Charges US $</strong>
            </Col>
            <Col>
              <strong>Total Shipping Discount US $ </strong>
            </Col>
            <Col>
              <strong> Sub Total</strong>
            </Col>
            <hr />
          </Row>
          <Row>
            <Col> US $ 100</Col>
            <Col> US $ 100</Col>
            <Col> US $ 100</Col>
            <Col> US $ 100</Col>
            <Col> US $ 100</Col>
            <Col> US $ 100</Col>
          </Row>
          <div className="d-flex justify-content-between ">
            <div>
              <p>
                <strong>Payment Mode: </strong>
              </p>
              <p>ONLINE</p>
            </div>
            <div className="" style={{ borderTop: "1px dotted black" }}>
              <span>
                <strong> Grand Total </strong>
              </span>
              <span className="mx-5">
                <strong> $930 </strong>
              </span>

              <p>(included tax fee)</p>
            </div>
          </div>
          <hr />
        </Row>

        <Col md={4} xs={6} sm={6}>
          <p>
            <strong> Terms & Conditions:</strong>
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            placeat ex commodi
          </p>
        </Col>
      </div>

      {/* Displayed only on the screen */}
      {showPrint && (
        <div className="btn-print  d-print-none">
          <button
            onClick={handlePrint}
            className="btn btn-primary mt-3"
            style={{ display: "block" }}
          >
            Print
          </button>
          <div className="other-data">here haseeb and zubair work</div>
        </div>
      )}
    </div>
  );
};

export default Index;
