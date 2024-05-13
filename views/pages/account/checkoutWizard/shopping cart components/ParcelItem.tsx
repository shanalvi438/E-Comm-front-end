import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ParcelItem = ({ item, orderProductDetails }) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

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

  return (
    <div
      className="container rounded rounded-3 p-4 mb-3 shadow shadow"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="row">
        <div className="col text-center mb-3">
          <Link
            href="/product-details/[id]"
            as={`/product-details/${item?.id}`}
          >
            <a className="shadow-sm rounded rounded-3">
              <Image
                src={item?.url}
                className="img-fluid "
                width={80}
                height={80}
              />
            </a>
          </Link>
        </div>
        <div className="col-lg-6 col-md-4 col-sm-3 d-flex flex-column">
          <span className="text-dark text-start">{item?.name}</span>
          <span className="text-start">Model: {item?.model_no}</span>
        </div>
        <div className="col">
          <p className="text-center d-flex text-dark">
            QTY:&nbsp;
            <div className="qty-box">
              <div className="input-group">
                <input
                  type="text"
                  name="quantity"
                  className="input-number"
                  style={{
                    border: "none",
                    outline: "none",
                    width: "40px",
                    padding: "0",
                    margin: "0",
                    backgroundColor: "#fafafa",
                  }}
                  value={orderProductDetails?.quantity}
                  disabled
                />
              </div>
            </div>
          </p>
        </div>
        {/* for laptop and above screen */}
        <div className="col d-flex flex-column d-none d-sm-block">
          <div className="mb-2">
            <del className="text-secondary d-flex justify-content-end">
              ${item?.new_price}
            </del>
            <p className="d-flex justify-content-end text-dark">
              ${item?.new_sale_price}
            </p>
          </div>
        </div>
        {/* for mobile screen */}
        <div className="row d-flex flex-column d-block d-sm-none">
          <div className="mb-2">
            <del className="text-secondary">${item?.new_price}</del>
            <p className=" text-dark">${item?.new_sale_price}</p>
          </div>
        </div>
      </div>
      <div className="row">
        {/* for laptop and above screen */}
        <div
          className="col d-none d-sm-block"
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
              <p>{orderProductDetails?.status}</p>
            </span>
          </div>
        </div>
        {/* for mobile screen */}
        <div
          className="col d-block d-sm-none"
          style={{ textAlign: isMobile ? "center" : "start" }}
        >
          <div className="d-flex flex-column">
            <div className="mb-2 d-flex">
              <p className="me-2" style={{ fontWeight: "600" }}>
                TAX
              </p>
              <span>VAT 10%</span>
            </div>
            <span className="mb-2 d-flex">
              <p className="me-2" style={{ fontWeight: "600" }}>
                Shipping
              </p>
              <p>
                US $<del>30</del>{" "}
                <span className="text-success fw-bold">Free</span>
              </p>
            </span>
            <span className="mb-2 d-flex">
              <p className="me-2" style={{ fontWeight: "600" }}>
                Status
              </p>
              <p>{orderProductDetails?.status}</p>
            </span>
          </div>
        </div>
      </div>
      {/* for laptop and above screen */}
      <div className="row d-flex justify-content-center d-none d-sm-block">
        <div className="col">
          <div className="row d-flex justify-content-start text-dark">
            <div className="col-9">
              <div className="row d-flex justify-content-start">
                <div className="col-5">
                  <p>Estimated Delivery Between:</p>
                </div>
                <div className="col-7">
                  <p className="text-secondary">
                    Saturday, Jan 28 2024 <span className="text-dark">|</span>{" "}
                    Tuesday, Feb 01 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* for mobile screen */}
      <div className="row d-block d-sm-none">
        <div className="row d-flex justify-content-start text-dark">
          <div className="col mb-3">
            <p>Estimated Delivery Between:</p>
          </div>
          <div className="col mb-3">
            <p className="text-secondary">
              Saturday, Jan 28 2024 <span className="text-dark"> | </span>{" "}
              Tuesday, Feb 01 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelItem;
