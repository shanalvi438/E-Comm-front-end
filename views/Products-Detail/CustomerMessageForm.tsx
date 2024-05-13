import React, { useState } from "react";
import { Row, Col, Form, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

function CustomerMessageForm() {
  const [file, setFile] = useState(null);

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
    <>
      <section
        id="support"
        className="w-50  tab-product tab-exes creative-card creative-inner mb-0  mt-4 "
        style={{ backgroundColor: "rgb(254, 249, 249)" }}
      >
        <Row>
          <Col sm="12" lg="12">
            <Form className="">
              <div className="form-row row text-left">
                <div className="d-flex justify-content-between">
                  <p>Ask Your Questions:</p>
                  <div>
                    <strong>Voltonic Solutions Pvt Ltd.</strong>
                  </div>
                </div>

                <Col lg="12 mt-3">
                  <div>
                    <Label htmlFor="Product name"> Query Title:</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="Product name"
                      placeholder="Type Title"
                      required
                    />
                  </div>
                </Col>
                <Row className="m-3 mx-0">
                  <Col md="6 ">
                    <Label htmlFor="Product Name">Product Name :</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="Product Name"
                      placeholder="Product Name"
                      required
                    />
                  </Col>

                  <Col md="6 ">
                    <Label htmlFor="Model No">Model No.</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="Model No"
                      placeholder="Model No"
                      required
                    />
                  </Col>
                </Row>
                <Row className="m-3 mx-0">
                  <Col md="4 ">
                    <Label htmlFor="Brand /Comaony">Brand /Comaony :</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="Brand /Comaony"
                      placeholder="Brand /Comaony"
                      required
                    />
                  </Col>

                  <Col md="4 ">
                    <Label htmlFor="MOQ">MOQ.</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="MOQ"
                      placeholder="MOQ"
                      required
                    />
                  </Col>
                  <Col md="4 ">
                    <Label htmlFor="FOB">FOB</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="FOB"
                      placeholder="FOB"
                      required
                    />
                  </Col>
                </Row>
                <Col lg="12 mt-3">
                  <div>
                    <Label htmlFor="Product name"> Ref url:</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="Ref url"
                      placeholder="Ref url"
                      required
                    />
                  </div>
                </Col>

                <div className="p-3 mt-3 border rounded bg-white position-relative">
                  <Col md="12 mt-3">
                    <div className="media">
                      <Label className="mb-0 mr-3">Message:</Label>
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
                    <div className=" mt-3 d-flex  justify-content-between ">
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
                      <div className=" ">
                        <button
                          type="button"
                          className=" btn btn-outline-secondary"
                          onClick={handleAttachmentClick}
                        >
                          <FontAwesomeIcon icon={faPaperclip} />
                        </button>
                        {file && (
                          <p className=" ">Selected file: {file.name}</p>
                        )}
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
        </Row>
      </section>
    </>
  );
}

export default CustomerMessageForm;
