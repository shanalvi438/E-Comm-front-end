import React, { useState } from "react";
import { Row, Col, Form, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Layout1 from "views/layouts/layout1";
import AllProducts from "views/layouts/widgets/AllProducts/allProducts";

function ContactUs() {
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
      <Layout1>
        <div className=" w-50 mx-auto">
          <section
            id="support"
            className=" tab-product tab-exes creative-card creative-inner mb-0 bg-light "
          >
            <Form>
              <div className="form-row row">
                <div className="mt-3">
                  <div>
                    <Label htmlFor="Product name">Title:</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="Product name"
                      placeholder="Type Title"
                      required
                    />
                  </div>
                  <Label className="m-3" htmlFor="title">
                    User Type:
                  </Label>
                  <select id="title" name="title" className="form-control">
                    <option value="Supplier">Supplier</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Visitor">Visitor</option>
                  </select>
                </div>
                <div className="m-3 mx-0 row">
                  <div className="col-md-4">
                    <Label htmlFor="Company">Company:</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="Company"
                      placeholder="Company"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <Label htmlFor="Contact">Contact</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="Contact"
                      placeholder="Enter Contact name"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <Label htmlFor="E-mail">E-mail:</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="E-mail"
                      placeholder="E-mail"
                      required
                    />
                  </div>
                </div>

                <div className="p-3 m-2 border rounded bg-white position-relative">
                  <div className="mt-3">
                    <div className="media">
                      <Label className="mb-0 ">Message:</Label>
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
                      <div>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={handleAttachmentClick}
                        >
                          <FontAwesomeIcon icon={faPaperclip} />
                        </button>
                        {file && (
                          <p className=" ">Selected file: {file.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    className="btn btn-normal"
                    type="submit"
                    style={{ backgroundColor: "var(--theme-color2)" }}
                  >
                    Submit Your Query
                  </button>
                </div>
              </div>
            </Form>
          </section>
        </div>

        <AllProducts />
      </Layout1>
    </>
  );
}

export default ContactUs;
