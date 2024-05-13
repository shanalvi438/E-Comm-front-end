import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { renderTinyMCEDataUnBold } from "utils/utility";
import { BACKEND_URL } from "utils/constants";

const MenuNewsSlider = ({ contentData, slidesToShow }) => {
  const sliderRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderSetting = {
    autoplay: true,
    infinite: true,
    arrows: false,
    dots: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Function to go to the next slide
  const nextSlide = (sliderRef: any) => {
    sliderRef.current.slickNext();
  };

  // Function to go to the previous slide
  const prevSlide = (sliderRef: any) => {
    sliderRef.current.slickPrev();
  };

  const [maxWidthForTopBigImage, setMaxWidthForTopBigImage] = useState("70%");
  useState("70%");

  useEffect(() => {
    const handleResizeForTopBigImage = () => {
      // Adjust max-width based on window width
      if (window.innerWidth >= 2560) {
        setMaxWidthForTopBigImage("100%");
      } else if (window.innerWidth >= 1024) {
        setMaxWidthForTopBigImage("90%");
      } else if (window.innerWidth >= 768) {
        setMaxWidthForTopBigImage("80%");
      } else if (window.innerWidth >= 320) {
        setMaxWidthForTopBigImage("90%");
      } else {
        setMaxWidthForTopBigImage("100%");
      }
    };

    // Initial setup
    handleResizeForTopBigImage();

    // Attach event listener for window resize
    window.addEventListener("resize", handleResizeForTopBigImage);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResizeForTopBigImage);
    };
  }, []);

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="row cn-slider">
            <div className="col d-flex justify-content-center">
              <div className="col-8 text-start">
      <h3 className="text-dark">{contentData[0]?.blog_category?.blog_category_id}</h3>
              </div>
              <div className="col-2 text-end">
                <button
                  className="btn btn-light"
                  onClick={() => prevSlide(sliderRef)}
                >
                  {" "}
                  <i className="fa fa-angle-left fw-bold" />
                </button>
              </div>
              <div className="col-2 text-end">
                <button
                  className="btn btn-light"
                  onClick={() => nextSlide(sliderRef)}
                >
                  <i className="fa fa-angle-right fw-bold" />
                </button>
              </div>
            </div>
            <Slider ref={sliderRef} {...sliderSetting}>
              {contentData.map((content, index) => (
                <div key={index} className="col-md-6 p-1">
                  <>
                    <div className="mn-img">
                      <Link
                        href={{
                          pathname: "/blog/blog-detail",
                          query: {
                            contentData: JSON.stringify(contentData),
                            contentIndex: index,
                            baseCategory:
                              contentData[0]?.blog_category?.blog_category_id,
                          },
                        }}
                      >
                        <a>
                          <Image
                            className="blog-mn-img img-fluid"
                            src={`${BACKEND_URL}/${content.feature_image}`}
                            style={{ height: "340px", objectFit: "cover" }}
                            width={508}
                            height={340}
                            objectFit="cover"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="mn-content">
                      <Link
                        href={{
                          pathname: "/blog/blog-detail",
                          query: {
                            contentData: JSON.stringify(contentData),
                            contentIndex: index,
                            baseCategory:
                              contentData[0]?.blog_category?.blog_category_id,
                          },
                        }}
                      >
                        <a
                          className="mn-title"
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth:
                              maxWidthForTopBigImage /* Adjust this based on your layout needs */,
                          }}
                        >
                          {content.title.substring(0, 35)}...
                        </a>
                      </Link>

                      <p>
                        <span className="d-flex">
                          <span
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              maxWidth:
                                maxWidthForTopBigImage /* Adjust this based on your layout needs */,
                            }}
                          >
                            {renderTinyMCEDataUnBold(
                              content.description.substring(0, 100)
                            )}
                          </span>
                          <span>...</span>
                        </span>
                      </p>
                      <a className="mn-date">
                        <i className="far fa-clock"></i>
                        {content?.created_at?.substring(0, 10)}
                      </a>
                    </div>
                  </>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuNewsSlider;
