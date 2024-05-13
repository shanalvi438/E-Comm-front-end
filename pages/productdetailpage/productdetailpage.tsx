import axios from "axios";
import { FilterContext } from "helpers/filter/filter.context";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { BACKEND_URL } from "utils/constants";
import CustomerMessageForm from "views/Products-Detail/CustomerMessageForm";
import DetailAddMore from "views/Products-Detail/common/DetailAddMore";
import ProductService from "views/Products-Detail/product-service";
import ProductSlick from "views/Products-Detail/product-slick";
import TabProduct from "views/Products-Detail/tab-product";

const ProductDetailPage = ({ id }) => {
  const filterContext = useContext(FilterContext);
  const { filterOpen, setFilterOpen } = filterContext;

  const [productData, setProductData] = useState(null);

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
      <DetailAddMore/>
    </div>
  );
};

export default ProductDetailPage;
