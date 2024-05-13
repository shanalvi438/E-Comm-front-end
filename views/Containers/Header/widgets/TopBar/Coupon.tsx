// Coupon.tsx
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";

interface Coupon {
  percentage: number;
  discount_type: string;
  coupon_title: string;
  minimum_purchase: number;
  start_date: string;
  end_date: string;
  coupon_code: string;
}

interface CouponProps {
  cpns?: Coupon[]; // Make cpns prop optional
}

const Coupon: React.FC<CouponProps> = ({ cpns = [] }) => {
  // Provide default value
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyClick = (couponCode: string, index: number) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1);
  };

  return (
    <Row className="custom-container flex justify-content-center ">
      {cpns.map((coupon, index) => (
        <Col
          lg={2}
          key={index}
          className="m-2 "
          style={{
            borderStyle: "dashed",
            borderColor: "#D6D6D6",
            position: "relative",
            borderRadius: "10px",
          }}
        >
          {/* Coupon JSX here */}
         
        </Col>
      ))}
    </Row>
  );
};

export default Coupon;
