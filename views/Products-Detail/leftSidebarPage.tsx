import React, { useContext, useEffect } from "react";
import { NextPage } from "next";
import { Row, Col } from "reactstrap";
import Sidebar from "../../views/Products-Detail/sidebar";
import ProductService from "../../views/Products-Detail/product-service";
import NewProduct from "../Collections/NewProduct";
import TabProduct from "../../views/Products-Detail/tab-product";
import ProductSlick from "../../views/Products-Detail/product-slick";
import { FilterContext } from "helpers/filter/filter.context";
import CustomerMessageForm from "./CustomerMessageForm";
import axios from "axios";
import { BACKEND_URL } from "utils/constants";

interface LeftSidebar {
  id: any;
}

const LeftSidebarPage: NextPage<LeftSidebar> = ({ id }) => {
  const filterContext = useContext(FilterContext);
  const { filterOpen, setFilterOpen } = filterContext;

  const [productData, setProductData] = React.useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/single-product/${id}`
        );
        const responseData = response.data;
        setProductData(responseData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    loadItems();
  }, []);

  useEffect(() => {
    console.log("product data: ", productData);
  }, [productData]);

  return (
    <div className="collection-wrapper">
      {productData && (
        <div className="custom-container">
          <Row>
            <Col sm="12" lg="9" xs="12">
              <Row>
                <Col xl="12">
                  <div className="filter-main-btn mb-sm-4">
                    <span
                      className="filter-btn"
                      onClick={() => setFilterOpen(!filterOpen)}
                    >
                      <i className="fa fa-filter" aria-hidden="true"></i> filter
                    </span>
                  </div>
                </Col>
              </Row>
              <Row>
                <ProductSlick
                  item={productData}
                  bundle={false}
                  swatch={false}
                />
              </Row>
              <TabProduct item={productData} />
              <CustomerMessageForm />
            </Col>
            <Col
              sm="3"
              className="collection-filter"
              style={{
                left: filterOpen ? "-15px" : "",
              }}
            >
              <ProductService pdf={productData.attachment} />
              {/* <NewProduct  item={productData}/> */}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/single-product/${params.id}`
    );
    const productData = response.data;

    return {
      props: { productData },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: { productData: null }, // or handle the error as needed
    };
  }
}

export default LeftSidebarPage;
