import { NextPage } from "next";
import React, { useState } from "react";

import { Row, Col, Form, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Layout1 from "views/layouts/layout1";

const ProductReportPage: NextPage = () => {
  const [file, setFile] = useState(null);

  const [userType, setUserType] = useState("");
  const onChange = (event) => {
    setUserType(event.target.value);
  };

  const handleAttachmentClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.accept = ".jpeg";

    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const selectedFile = target.files && target.files[0];
      setFile(selectedFile);
    };
    input.click();
  };
  return (
    <div className=" d-flex justify-content-center mx-auto">
      <Layout1>
        <section
          id="support"
          className="tab-product tab-exes creative-card creative-inner mb-0 bg-light w-50 mx-auto"
        >
          <Col sm="12" lg="12">
            <Form>
              <div className="form-row row">
                <Col lg="12 mt-3">
                  <div>
                    <Label htmlFor="Product name">Report :</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="Product name"
                      placeholder="Type Title"
                      required
                    />
                  </div>
                </Col>

                <Row>
                  <Col>
                    <div>
                      <Label className="m-3" htmlFor="userType">
                        User type
                      </Label>
                      <select
                        id="userType"
                        name="userType"
                        className="form-control"
                        onChange={onChange}
                      >
                        <option value="Supplier">Supplier</option>
                        <option value="Buyer">Buyer</option>
                      </select>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Label
                        className="m-3"
                        htmlFor="title"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Opponent profile url
                      </Label>

                      <Input
                        type="text"
                        className="form-control"
                        id="profile url"
                        placeholder="profile url"
                        required
                      />
                    </div>
                  </Col>
                </Row>

                <Col>
                  <Row>
                    <div>
                      <Label className="m-3" htmlFor="goodType">
                        {userType === "Supplier"
                          ? "For Supplier"
                          : userType === "Buyer"
                          ? "For Buyer"
                          : "Good Type"}
                      </Label>
                      <select
                        id="goodType"
                        name="goodType"
                        className="form-control"
                      >
                        {userType === "Supplier" ? (
                          <>
                            <option value="Out of stock items">
                              Out of stock items
                            </option>
                            <option value="Lack of support">
                              Lack of support
                            </option>
                            <option value="Dangerous weapons">
                              Dangerous weapons
                            </option>
                            <option value="Dangerous product">
                              Dangerous product
                            </option>
                            <option value="Harmful product">
                              Harmful product
                            </option>
                            <option value="Drug product">Drug product</option>
                            <option value="Adult product">Adult product</option>
                            <option value="Illegal product">
                              Illegal product
                            </option>
                            <option value="Other product">Other product</option>
                          </>
                        ) : userType === "Buyer" ? (
                          <>
                            <option value="Aggressive">Aggressive</option>
                            <option value="Others">Other</option>
                          </>
                        ) : null}
                      </select>
                    </div>
                  </Row>
                </Col>
                {userType === "Supplier" && (
                  <Col lg="12 my-3">
                    <div>
                      <Label htmlFor="Product URL">Product URL:</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="Product URL"
                        placeholder="Product URL"
                        required
                      />
                    </div>
                  </Col>
                )}

                <div className="p-3 mt-3 border rounded bg-white position-relative">
                  <Col md="12 mt-3">
                    <div>
                      <div className="media">
                        <div className="col-1"></div>
                        <div className="col d-flex justify-content-end">
                          <p>
                            Note: Upon submitting this complaint, I agree to
                            INDUSTRY MALL reporting platform terms and
                            conditions. I acknowledge and agree that INDUSTRY
                            MALL shall have the right and discretion to verify
                            the infringement alleged in my report and take
                            appropriate actions.
                          </p>
                        </div>
                      </div>
                      <div className="media">
                        <div className="col-1">
                          <Label className="mb-0">Reporting Message:</Label>
                        </div>
                        <div className="media-body mb-5 position-relative">
                          <textarea
                            className="form-control bg-light"
                            style={{ resize: "vertical", overflowY: "auto" }}
                            rows={4}
                            placeholder="Write Your Text Here"
                            id="exampleFormControlTextarea1"
                          ></textarea>
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="text-muted"
                          >
                            This message must be between 100-400 Characters
                          </label>
                        </div>
                      </div>
                      <div className="mt-3 d-flex justify-content-between">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="agreeCheckbox"
                            style={{ backgroundColor: "var(--theme-color2)" }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="agreeCheckbox"
                          >
                            I agree with all term n condition
                          </label>
                        </div>
                        <div className="">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleAttachmentClick}
                          >
                            <FontAwesomeIcon icon={faPaperclip} />
                          </button>
                          {file && (
                            <p className="">Selected file: {file.name}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>

                <Col md="12 mt-3" className="mt-3">
                  <button
                    className="btn btn-normal"
                    type="submit"
                    style={{ backgroundColor: "var(--theme-color2)" }}
                  >
                    Submit Your Query
                  </button>
                </Col>
              </div>
            </Form>
          </Col>
        </section>
      </Layout1>
    </div>
  );
};

export default ProductReportPage;
