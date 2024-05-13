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
          className="tab-product tab-exes creative-card creative-inner mb-0 bg-light col-8 mx-auto"
        >
          <h3>Open Dispute</h3>
          <Col sm="12" lg="12">
            <Form>
              <div className="form-row row">
                

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

                <Row>
                <Col>
                    <div>
                      <Label
                        className="m-3"
                        htmlFor="title"
                        style={{ whiteSpace: "nowrap" }}
                      >
                       Product Url
                      </Label>

                      <Input
                        type="text"
                        className="form-control"
                        id="Product Url"
                        placeholder="Product Url"
                        required
                      />
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Label
                        className="m-3"
                        htmlFor="title"
                        style={{ whiteSpace: "nowrap" }}
                      >
                       Product SKU
                      </Label>

                      <Input
                        type="text"
                        className="form-control"
                        id="Product SKU"
                        placeholder="Product SKU"
                        required
                      />
                    </div>
                  </Col>
                </Row>

                
              

                <div className="p-3 mt-3 border rounded bg-white position-relative">
                  <Col md="12 mt-3">
                    <div>
                     
                      <div className="media">
                        <div className=" ">
                          <Label className="mb-0"> Message:</Label>
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
                         <p style={{color:"#999"}}>
                            Note: Upon submitting this complaint, I agree to
                            INDUSTRY MALL reporting platform terms and
                            conditions. I acknowledge and agree that INDUSTRY
                            MALL shall have the right and discretion to verify
                            the infringement alleged in my report and take
                            appropriate actions.
                          </p>
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
                    SEND
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
