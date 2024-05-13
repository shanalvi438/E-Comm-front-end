import React, { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { NextPage } from "next";

const MobileSearch: NextPage = () => {
  useEffect(() => {
    document.getElementById("search-overlay").style.display = "none";
  }, []);
  const closeSearch = () => {
    document.getElementById("search-overlay").style.display = "none";
  };

  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "flex";
  };
  return (
    <div className="custom-container">
      <li className="onhover-div mobile-search">
        <i className="icon-search" onClick={openSearch}></i>
      </li>
      <div id="search-overlay" className="search-overlay">
        <div>
          <span
            className="close-mobile-search"
            onClick={closeSearch}
            title="Close Overlay"
          >
            ×
          </span>
          <div className="overlay-content">
            <div className="custom-container">
              <Row>
                <Col xl="12">
                  <Form>
                    <FormGroup>
                      <Input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Search a Product"
                      />
                    </FormGroup>
                    <Button type="submit" className="btn btn-primary">
                      <i className="fa fa-search"></i>
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearch;
