import React, { useState } from "react";
import Link from "next/link";
import { Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import DescriptionTabContent from "./common/DescriptionTabContent";
import SpecificationTabContent from "./common/SpecificationTabContent";
import ReviewsTabContent from "./common/ReviewsTabContent";

interface ProductDeskProps {
  item: any;
}

const TabProduct: React.FC<ProductDeskProps> = ({ item }) => {
  const [activeTab, setActiveTab] = useState("description");

  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };

  const product = item;

  // Define the underline style for the active navigation item
  const activeNavStyle = {
    textDecoration: "underline",
    textDecorationColor: "blue", // Change the color as needed
  };

  return (
    <>
      {product && (
        <section className="tab-product tab-exes creative-card creative-inner mb-0 ">
          <Row className="mt-5">
            <Col sm="12" lg="12">
              <Nav
                tabs
                className="nav-material sticky-top   bg-white mt-5 "
                id="top-tab"
                role="tablist"
              >
                <NavItem>
                  <Link href="#description">
                    <a
                      className={`nav-link ${
                        activeTab === "description" ? "active" : ""
                      }`}
                      style={activeTab === "description" ? activeNavStyle : {}}
                      onClick={() => toggleTab("description")}
                    >
                      Description
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="#specification">
                    <a
                      className={`nav-link ${
                        activeTab === "specification" ? "active" : ""
                      }`}
                      style={
                        activeTab === "specification" ? activeNavStyle : {}
                      }
                      onClick={() => toggleTab("specification")}
                    >
                      Specification
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="#reviews">
                    <a
                      className={`nav-link ${
                        activeTab === "reviews" ? "active" : ""
                      }`}
                      style={activeTab === "reviews" ? activeNavStyle : {}}
                      onClick={() => toggleTab("reviews")}
                    >
                      Reviews
                    </a>
                  </Link>
                </NavItem>
              </Nav>
              <hr className="mb-5" />
              <div className="mt-5">
                <div id="description">
                  <DescriptionTabContent product={product} />
                </div>
                <div id="specification">
                  <SpecificationTabContent />
                </div>
                <div id="reviews">
                  <ReviewsTabContent />
                </div>
              </div>
            </Col>
          </Row>
        </section>
      )}
    </>
  );
};

export default TabProduct;
