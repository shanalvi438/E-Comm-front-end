import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { renderTinyMCEDataUnBold } from "utils/utility";
import { BACKEND_URL } from "utils/constants";

const LatestBlogsSlider = ({ contentData, slidesToShow }) => {
  const subcategoriesToShow = 5;
  const [startIdx, setStartIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sliderRef = useRef();

  const filteredContent =
    selectedCategory === "All"
      ? contentData
      : contentData.filter((item) => item.category === selectedCategory);

  const contentDataJson = JSON.stringify(contentData);

  const subcategories = [...new Set(contentData.map((item) => item.category))];
  subcategories.unshift("All");

  const sliderSetting = {
    autoplay: false,
    infinite: true,
    dots: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
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
          slidesToShow: 2,
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

  const [maxWidthForTopBigImage, setMaxWidthForTopBigImage] = useState("70%");

  useEffect(() => {
    const handleResizeForTopBigImage = () => {
      // Adjust max-width based on window width
      if (window.innerWidth >= 2560) {
        setMaxWidthForTopBigImage("100%");
      } else if (window.innerWidth >= 1440) {
        setMaxWidthForTopBigImage("90%");
      } else if (window.innerWidth >= 1024) {
        setMaxWidthForTopBigImage("90%");
      } else if (window.innerWidth >= 768) {
        setMaxWidthForTopBigImage("80%");
      } else if (window.innerWidth >= 425) {
        setMaxWidthForTopBigImage("95%");
      } else if (window.innerWidth >= 375) {
        setMaxWidthForTopBigImage("85%");
      } else if (window.innerWidth >= 320) {
        setMaxWidthForTopBigImage("70%");
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
      <h3 className="text-dark col mt-2 mb-2">
        <Link
          href={{
            pathname: "/blog/blog-detail",
            query: {
              category: selectedCategory,
              contentData: contentDataJson,
              baseCategory: contentData[0]?.blog_category?.blog_category_id,
            },
          }}
        >
          <a className="text-dark">More to Explore</a>
        </Link>
      </h3>
      <div className="row cn-slider">
        <Slider ref={sliderRef} {...sliderSetting}>
          {filteredContent.map((content, index) => (
            <div key={index} className="col-md-6 p-1">
              <Link
                href={{
                  pathname: "/blog/blog-detail",
                  query: {
                    category: selectedCategory,
                    contentData: contentDataJson,
                    contentIndex: index,
                    baseCategory:
                      contentData[0]?.blog_category?.blog_category_id,
                  },
                }}
              >
                <a>
                  <div className="cn-img">
                    <Image
                      className="blog-cn-img img-fluid"
                      style={{ height: "250px", objectFit: "cover" }}
                      src={`${BACKEND_URL}/${content.feature_image}`}
                      alt={content.title}
                      width={385}
                      height={250}
                      objectFit="cover"
                    />
                    <div className="cn-content-relative">
                      <div className="cn-content-inner">
                        <a
                          className="cn-title text-dark fw-bold"
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
                        <p className="cn-description ">
                          <span className="d-flex text-dark">
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
                                content.description.substring(0, 95)
                              )}
                            </span>
                            <span>...</span>
                          </span>
                        </p>
                        <a className="cn-date">
                          <i className="far fa-clock text-dark"></i>
                          <span className="text-dark">
                            {content.created_at.substring(0, 10)}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default LatestBlogsSlider;
