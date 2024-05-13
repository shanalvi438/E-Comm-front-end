import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import Slider from "react-slick";
import ProductDetail from "./product-detail";
import Image from "next/image";

interface ProductSlickProps {
  item: any;
  bundle: boolean;
  swatch: boolean;
}

const ProductSlick: React.FC<ProductSlickProps> = ({
  item,
  bundle,
  swatch,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({ nav1: null, nav2: null });
  const data = item;

  // Create a single ref for the sliders
  const slider1 = React.useRef<Slider>();
  const slider2 = React.useRef<Slider>();

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [item]);

  const { nav1, nav2 } = state;

  const changeImage = (img_id) => {
    slider1.current.slickGoTo(img_id);
    slider2.current.slickGoTo(img_id);
  };

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [item]);

  useEffect(() => {
    console.log("url: ", data.url);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center ">
          <button className="btn btn-dark" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        </div>
      ) : (
        data && (
          <>
            <Col lg="5">
              <Slider className="product-slick" asNavFor={nav2} ref={slider1}>
                {data.product_images.length > 0 ? (
                  data.product_images.map((img: any, i: any) => (
                    <div
                      key={i}
                      className="image-container zoomable-image-container" // Add the zoomable class
                      onClick={() => changeImage(i)}
                    >
                      <Image
                        src={img.url}
                        alt=""
                        width={500}
                        height={500}
                        layout="fill"
                        objectFit="contain"
                        priority
                      />
                    </div>
                  ))
                ) : (
                  <div className="image-container zoomable-image-container">
                    <Image
                      src={data?.url}
                      alt={data?.url}
                      width={500}
                      height={500}
                      layout="fill"
                      objectFit="contain"
                      priority
                    />
                  </div>
                )}
              </Slider>
              <Row>
                <Col>
                  <div>
                    
                    <Slider
                      className="slider-nav"
                      asNavFor={nav1}
                      ref={slider2}
                      slidesToShow={
                        data.product_images.length < 4
                          ? data.product_images.length
                          : 4
                      }
                      swipeToSlide={true}
                      focusOnSelect={true}
                      arrows={true}
                      infinite={false}
                    >
                      {data.product_images.map((img: any, i: any) => (
                        <div
                          key={i}
                          className="image-container"
                          onClick={() => changeImage(i)}
                        >
                          <Image
                            src={img.url}
                            alt=""
                            width={100}
                            height={100}
                            objectFit="contain"
                            priority
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg="7" className="rtl-text">
              <ProductDetail
                item={item}
                bundle={bundle}
                swatch={swatch}
                totalReview={0}
                offers={0}
                changeColorVar={undefined}
              />
            </Col>
          </>
        )
      )}
    </>
  );
};

export default ProductSlick;
