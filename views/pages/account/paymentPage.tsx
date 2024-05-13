import React, { useState } from "react";
import { NextPage } from "next";
import PaymentMasterCard from "../components/PaymentMasterCard";
import PaymentVisaCard from "./PaymentVisaCard";
import PaymentAddcard from "./PaymentAddcard";
import PaymentBank from "./PaymentBank";
import PaymentAddbank from "./PaymentAddbank";

type Props = {
  userData: any;
};

const PaymentMethod: NextPage<Props> = ({ userData }) => {
  return (
    <>
      <section className="  bg-white shadow-sm rounded p-4 mb-4 contact-page register-page section-big-py-space bg-light">
        <h3>Credit or Debit Cards</h3>
        <hr />
        <div className="row w-100 g-5">
          {/* 1st Card */}
          <div className="col-12 col-md-6 col-lg-4 ">
            <PaymentVisaCard />
          </div>

          {/* 2nd Card */}
          <div className="col-12 col-md-6 col-lg-4">
            <PaymentMasterCard />
          </div>

          {/* 3rd Card */}
          <div className="col-12 col-md-6 col-lg-4">
            <PaymentAddcard onClose={undefined} showCard={undefined} />
          </div>
        </div>
      </section>
      <section className="bg-white shadow-sm rounded p-4 mb-4">
        <h3 className="text-5 fw-400 mb-4">
          Bank Accounts{" "}
          <span className="text-muted text-4">(for withdrawal)</span>
        </h3>
        <hr className="mb-4 mx-n4" />
        <div className="row g-5 d-flex justify-content-between w-100">
          <div className="col-12 col-md-6 col-lg-6">
            <PaymentBank />
          </div>
          <div className="col-12 col-md-6 col-lg-">
            {/* add bank  */}
            <PaymentAddbank onClose={undefined} showCard={undefined} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentMethod;
