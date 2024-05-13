import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import axios from "axios";
import { GET_USER_PROFILE } from "utils/constants";

const DashboardComponent = () => {
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    customer_id: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
    zipcode: "",
    city: "",
    country: "",
    company: "",
    image: "",
    website_link: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setId(localStorage.getItem("id"));

    const loadItems = async () => {
      try {
        const response = await axios.get(`${GET_USER_PROFILE}/${id}`);
        const itemData = response.data;
        setFormData(itemData.user_profile);
        console.log("itemData", itemData);
      } catch (error) {
        console.log(error);
      }
    };
    loadItems();
  }, [id]);

  return (
    <>
      <div className="Account-right">
        <div className="Account">
          <div className="page-title">
            <h2 className="text-center">My Dashboard</h2>
            <h4>Profile</h4>
          </div>
          <div className="box-account box-info">
            <div className="row">
              <div className="col-sm-6">
                <div className="box">
                  <div className="box-title">
                    <h3>First Name</h3>
                  </div>
                  <div className="box-content">
                    <h6>{formData?.first_name}</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="box">
                  <div className="box-title">
                    <h3>Last Name</h3>
                  </div>
                  <div className="box-content">
                    <p>{formData?.last_name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="box">
                  <div className="box-title">
                    <h3>Company Name</h3>
                  </div>
                  <div className="box-content">
                    <p>{formData?.company}</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="box">
                  <div className="box-title">
                    <h3>E-mail</h3>
                  </div>
                  <div className="box-content">
                    <p>{formData?.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="box">
                  <div className="box-title">
                    <h3>Website</h3>
                  </div>
                  <div className="box-content">
                    <p>{formData?.website_link}</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="box">
                  <div className="box-title">
                    <h3>Address</h3>
                  </div>
                  <div className="box-content">
                    <p>{formData?.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="box">
                  <div className="box-title">
                    <h3>Contact Number</h3>
                  </div>
                  <div className="box-content">
                    <p>{formData?.phone}</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="box">
                  <div className="box-title">
                    <h3>Gender </h3>
                  </div>
                  <div className="box-content">
                    <p>{formData?.gender}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="box">
                  <div className="box-title">
                    <h3>Password</h3>
                  </div>
                  <div className="box-content">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                    />
                    {/* <h6>
                      <a href="#">Reset Password</a>
                    </h6> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
