import Link from "next/link";
import React from "react";

const EmailFormat = () => {
  return (
    <div className="d-flex justify-content-center w-50 ">
      <div className="text-center align-items-center  ">
        <div className="header">
          <img
            src="/images/Industry Mall Logo-02.png"
            alt="Industry Mall Logo"
            className="img-fluid col-2"
          />
        </div>
        <div className="footer">
          <p>
            Have you any question? Conatct to our{" "}
            <a href="#">
              <Link href="#">
                <strong>
                  <span style={{ color: "Black" }}>
                    Support Center
                  </span>
                </strong>
              </Link>
            </a>{" "}
          </p>
          <br />
          <br />
          <p>CONTACT US</p>
          <p>Email : industrymall.net@gmail.com</p>
          <p>
            &copy; 2023-24 INDUSTRYMALL All <sup>&reg;</sup>rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailFormat;
