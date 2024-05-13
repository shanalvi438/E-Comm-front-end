import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import {
  BACKEND_URL,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
} from "utils/constants";
import Image from "next/image";

const ProfilePage = () => {
  const [id, setId] = useState("");
  const [image, setImage] = useState(null);
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

  useEffect(() => {
    console.log("image is selected", image);
  }, [image]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // error messages
  const created = "Updated Successfully";
  const errorMessage = "Something Bad Happened";
  const firstNameError = "First Name is missing";
  const lastNameError = "Last Name is missing";
  const genderError = "Gender is missing";
  const phoneError = "Phone is missing";

  const notifyCreate = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
    console.log("imge:", image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      customer_id: id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone1: formData.phone,
      gender: formData.gender,
      email: formData.email,
      address1: formData.address,
      zipcode: formData.zipcode,
      city: formData.city,
      country: formData.country,
      company: formData.company,
      website_link: formData.website_link,
      image: `/upload/${image}`,
    };

    try {
      console.log("updated data", data);
      // send a PATCH request to the server to update the profile
      const response = await axios.patch(UPDATE_USER_PROFILE, data);
      notifyCreate(created);

      // handle the response and perform any necessary actions
      console.log(response);
      console.log(response.data);

      // reset the form
    } catch (error) {
      notifyError(errorMessage);
      console.error(error);
    }
  };

  return (
    <>
      {/* Form Section */}
      <section className="contact-page register-page section-big-py-space bg-light">
        <div className="custom-container">
          <Row className="row">
            <Col lg="6">
              <h3 className="mb-3">PERSONAL DETAILS</h3>
              <Form className="theme-form">
                <div className="form-row row">
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="first_name"
                        placeholder="Enter Your name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="last_name"
                        placeholder="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="gender">Gender</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="gender"
                        placeholder="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="phone">Phone number</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Enter your number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter your address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="zipcode">Zip Code</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="zipcode"
                        placeholder="Enter your zip code"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="city">city</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Enter your city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="country"
                        placeholder="Enter your country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="company"
                        placeholder="Enter Your Company Name"
                        value={formData.company}
                        name="company"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="website_link">Website Link</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="website_link"
                        placeholder="Enter Your Website Link"
                        name="website_link"
                        value={formData.website_link}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label htmlFor="image">Image</Label>
                      <Input
                        type="file"
                        onChange={handleImageChange}
                        id="image"
                        placeholder="Image"
                        label="Image - Please select file less than 2 MB"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <button
                      className="btn btn-sm btn-normal mb-lg-5 mt-3"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </Col>
                </div>
              </Form>
            </Col>
            <Col lg="6">
              <h3 className="mb-3 spc-responsive">SAVED ADDRESS</h3>
              <div className="theme-form">
                <div className="row">
                  <div className="col-md-12">
                    <Label>
                      First Name:{" "}
                      <span className="fw-normal">{formData.first_name}</span>
                    </Label>
                  </div>
                  <div className="col-md-12">
                    <Label>
                      Last Name:{" "}
                      <span className="fw-normal">{formData.last_name}</span>
                    </Label>
                  </div>
                  <div className="col-md-12">
                    <Label>
                      Email: <span className="fw-normal">{formData.email}</span>
                    </Label>
                  </div>
                  <div className="col-md-12">
                    <Label>
                      Gender:{" "}
                      <span className="fw-normal">{formData.gender}</span>
                    </Label>
                  </div>
                  <div className="col-md-12">
                    <Label>
                      Phone Number:{" "}
                      <span className="fw-normal">{formData.phone}</span>
                    </Label>
                  </div>
                  <div className="col-md-12">
                    <Label>
                      Address:{" "}
                      <span className="fw-normal">{formData.address}</span>
                    </Label>
                  </div>
                  <div className="col-md-12">
                    <Label>
                      Zip Code:{" "}
                      <span className="fw-normal">{formData.zipcode}</span>
                    </Label>
                  </div>
                  <div className="col-md-12">
                    <Label>
                      city: <span className="fw-normal">{formData.city}</span>
                    </Label>
                  </div>
                  <div className="col-md-12">
                    <Label>
                      country:{" "}
                      <span className="fw-normal">{formData.country}</span>
                    </Label>
                  </div>
                  <div className="col-md-12">
                    <Label>
                      Company:{" "}
                      <span className="fw-normal">{formData.company}</span>
                    </Label>
                  </div>
                  <div className="col-md-12">
                    <Label>
                      Website Link:{" "}
                      <span className="fw-normal">{formData.website_link}</span>
                    </Label>
                  </div>
                  <div className="col-md-12">
                    <Label>
                      Image:{" "}
                      <span className="fw-normal">
                        <Image
                          src={`${BACKEND_URL}/${formData.image}`}
                          width={30}
                          height={30}
                          alt={formData.image}
                        />
                      </span>
                    </Label>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
