import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { WishlistContext } from "helpers/wishlist/wish.context";
import {
  faHeart,
  faHeart as farHeart,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons"; // Import heart icons
import { CartContext } from "helpers/cart/cart.context";
import { useCheckout } from "helpers/checkout/checkout.context";
import Link from "next/link";

const CartItem = ({
  item,
  removeFromCart,
  handleQtyUpdate,
  quantityError,
  key,
  coupens,
}) => {
  const { addToWish, removeFromWish, wishlistItems } =
    useContext(WishlistContext);
  const { updateQty } = useContext(CartContext);

  const isItemInWishlist = wishlistItems.some((wish) => wish.id === item.id);

  const [coupon, setCoupon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleHideModal = () => setShowModal(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Listen for window resize events
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const { selectedCoupons, setSelectedCoupons } = useCheckout(); // Updated this line

  const toggleCouponSelection = (index) => {
    const updatedSelectedCoupons = [...selectedCoupons];
    const couponIndex = updatedSelectedCoupons.indexOf(index);

    if (couponIndex === -1) {
      updatedSelectedCoupons.push(index);
    } else {
      updatedSelectedCoupons.splice(couponIndex, 1);
    }
    setSelectedCoupons(updatedSelectedCoupons);
  };

  const [qty, setQty] = useState(item.qty);
  const minusQty = () => {
    if (qty > 1) {
      console.log(qty);
      setQty(qty - 1);
      updateQty(item, qty - 1);
    }
  };

  const plusQty = () => {
    if (qty < item.stock.quantity) {
      console.log(qty);
      setQty(qty + 1);
      updateQty(item, qty + 1);
    } else {
    }
  };

  return (
    <div
      className="container rounded rounded-3 p-4 mb-3"
      style={{ backgroundColor: "#f6f6f6" }}
      key={key}
    >
      <div className="row">
        <div className="col">
          <Link href="/product-details/[id]" as={`/product-details/${item.id}`}>
            <a>
              <Image
                src={item.url}
                className="img-fluid rounded rounded-3"
                width={80}
                height={80}
              />
            </a>
          </Link>
        </div>
        <div className="col-lg-6 col-md-4 col-sm-3 d-flex flex-column">
          <span className="text-dark text-start">
            {item.name}
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro,
              voluptatum?
            </p>
          </span>
          <span className="text-start">
            Model: {item.model_no}
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur dicta maiores earum?
            </p>
          </span>
        </div>
        <div className="col">
          <p className="text-center d-flex text-dark">
            QTY:&nbsp;
            <div className="qty-box">
              <div className="input-group">
                <input
                  type="text"
                  name="quantity"
                  onChange={(e) => handleQtyUpdate(item, e.target.value)}
                  className="input-number"
                  style={{
                    border: "none",
                    outline: "none",
                    width: "40px",
                    padding: "0",
                    margin: "0",
                    backgroundColor: "#f6f6f6",
                  }}
                  value={qty}
                  min="1"
                  max={item.stock.quantity}
                  inputMode="numeric"
                  disabled
                />
                <span className="d-flex flex-column ">
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    style={{ fontSize: ".6rem" }}
                    onClick={plusQty}
                    className="cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{ fontSize: ".6rem" }}
                    onClick={minusQty}
                    className="cursor-pointer"
                  />
                </span>
              </div>
            </div>
          </p>
        </div>
        <div className="col d-flex flex-column">
          <div className="mb-2">
            <del className="text-secondary d-flex justify-content-end">
              ${item.new_price}
            </del>
            <p className="d-flex justify-content-end text-dark">
              ${item.new_sale_price}
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="col-2"
          style={{ textAlign: isMobile ? "center" : "start" }}
        >
          {selectedCoupons.length > 0 && (
            <p className="text-success" style={{ fontSize: ".7rem" }}>
              Coupon Applied
            </p>
          )}
          <button
            className="btn btn-sm fw-bold pt-0 pb-0 ps-2 pe-2"
            style={{
              border: "2px dashed #f9ad18",
              color: "#f9ad18",
              fontSize: "10px",
            }}
            onClick={handleShowModal}
          >
            Get Coupon
          </button>
          <CustomModal
            show={showModal}
            onHide={handleHideModal}
            title="Select Coupon(s)"
            content={
              <>
                <div className="row">
                  <Row className="custom-container flex justify-content-center ">
                    {coupens.map((coupon, index) => (
                      <Row key={index}>
                        <Col
                          key={index}
                          className={`m-2 ${
                            selectedCoupons.includes(index) ? "selected" : ""
                          }`}
                          style={{
                            borderStyle: "dashed",
                            borderColor: "#D6D6D6",
                            position: "relative",
                            borderRadius: "10px",
                            backgroundColor: selectedCoupons.includes(index)
                              ? "red"
                              : "rgb(226, 240, 255)",
                          }}
                          onClick={() => toggleCouponSelection(index)}
                        >
                          <FontAwesomeIcon
                            icon={faScissors}
                            style={{
                              position: "absolute",
                              top: "-12",
                              left: "30%",
                              transform: "translateX(-50%)",
                              color: "rgb(129, 172, 219)",
                              cursor: "pointer",
                              fontSize: "1.2rem",
                              zIndex: "2",
                            }}
                          />
                          <Row
                            style={{
                              backgroundColor: "rgb(226, 240, 255)",
                            }}
                          >
                            <Col lg={3}>
                              <div className="justify-content-center align-items-center text-center">
                                <div
                                  style={{
                                    fontSize: "40px",
                                    color: " rgb(129, 172, 219)",
                                  }}
                                >
                                  {Math.round(coupon.percentage)}
                                  <span
                                    className="text-danger text-center"
                                    style={{
                                      fontSize: "20px",
                                      verticalAlign: "super",
                                    }}
                                  >
                                    %
                                  </span>
                                </div>
                                <div className="justify-content-start  align-items-center mt-3">
                                  <span
                                    className=" text-uppercase    "
                                    style={{ fontSize: "10px" }}
                                  >
                                    {selectedCoupons.includes(index) ? (
                                      <p>Applied</p>
                                    ) : (
                                      <p>Coupon</p>
                                    )}
                                  </span>
                                  <div
                                    className={`text-uppercase text-center`}
                                    style={{
                                      backgroundColor: "rgb(129, 172, 219)",
                                      color: "white",
                                      paddingRight: "60px",
                                      width: "100%",
                                      fontSize: "15px",
                                      cursor: "pointer",
                                      transition: "background-color 0.9s ease",
                                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={9}>
                              <div
                                className="parent position-relative"
                                style={{ backgroundColor: "white" }}
                              >
                                <div className=" justify-content-center text-center align-items-center p-2">
                                  <div
                                    className="text-secondary"
                                    style={{ fontSize: "15px" }}
                                  >
                                    Discount on Purchase
                                    {coupon.discount_type}
                                  </div>
                                  <div
                                    className="text-uppercase"
                                    style={{ fontSize: "20px" }}
                                  >
                                    {coupon.coupon_title}
                                  </div>
                                  <div
                                    style={{
                                      color: "#0272bc",
                                      fontSize: "12px",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    Minimum Purchase ($) :
                                    {coupon.minimum_purchase}
                                  </div>
                                  <div>
                                    <div>
                                      <span
                                        className="fw-bold"
                                        style={{ fontSize: "15px" }}
                                      >
                                        Start Date :
                                      </span>
                                      <span
                                        style={{
                                          color:
                                            "darken(rgba(0, 0, 0, 0.7), 20%)",
                                        }}
                                      >
                                        {coupon.start_date}
                                      </span>
                                    </div>
                                    <div>
                                      <span
                                        className="fw-bold"
                                        style={{ fontSize: "15px" }}
                                      >
                                        End Date :
                                      </span>
                                      <span
                                        style={{
                                          color:
                                            "darken(rgba(0, 0, 0, 0.7), 20%)",
                                        }}
                                      >
                                        {coupon.end_date}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row"></div>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ))}
                  </Row>
                </div>
              </>
            }
          />
        </div>
        <div
          className="col"
          style={{ textAlign: isMobile ? "center" : "start" }}
        >
          <div className="d-flex">
            <span>
              <p style={{ fontWeight: "600" }}>TAX</p>
              <span>VAT 10%</span>
            </span>
            <div
              style={{ width: "1px", background: "#a7a7a7", height: "40px" }}
              className="ms-4 me-4"
            />
            <span>
              <p style={{ fontWeight: "600" }}>Shipping</p>
              <p>
                US $<del>30</del>{" "}
                <span className="text-success fw-bold">Free</span>
              </p>
            </span>
            <div
              style={{ width: "1px", background: "#a7a7a7", height: "40px" }}
              className="ms-4 me-4"
            />
            <span>
              <p style={{ fontWeight: "600" }}>Status</p>
              <p>Pending</p>
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-10 col-md-10 col-sm-3">
          <span className="text-dark d-flex justify-content-start">
            Estimated Delivery Between:&nbsp;
            <span className="text-secondary d-none d-md-block">
              Saturday, Jan 28 2024 <span className="text-dark">|</span>{" "}
              Tuesday, Feb 01 2024
            </span>
            <span className="text-secondary d-block d-sm-none">
              Saturday, Jan 28 2024 <br />
              Tuesday, Feb 01 2024
            </span>
          </span>
        </div>
        {/* for laptop or above screens */}
        <div className="col text-end d-none d-sm-block">
          <button
            className="btn btn-sm p-0 border-0"
            onClick={() => {
              isItemInWishlist ? removeFromWish(item) : addToWish(item);
            }}
          >
            <FontAwesomeIcon
              icon={isItemInWishlist ? faHeart : farHeart}
              style={{
                color: isItemInWishlist ? "red" : "gray",
              }}
            />
            &nbsp;
          </button>
          <button
            className="btn btn-sm p-0 border-0"
            onClick={(e) => {
              removeFromCart(item);
            }}
          >
            <i className="fa fa-trash text-secondary" aria-hidden="true"></i>
          </button>
        </div>
        {/* for mobile screens */}
        <div className="col text-center d-block d-sm-none">
          <button className="btn btn-sm p-0" onClick={() => addToWish(item)}>
            <i className="fa fa-heart-o text-secondary" aria-hidden="true"></i>
            &nbsp;
          </button>
          <button
            className="btn btn-sm p-0"
            onClick={(e) => {
              removeFromCart(item);
            }}
          >
            <i className="fa fa-trash text-secondary" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
