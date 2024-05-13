import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { renderTinyMCEData, renderTinyMCEDataUnBold } from "utils/utility";
import { BACKEND_URL } from "utils/constants";

const BlogMiniSlider = ({ contentData, slidesToShow }) => {
  const [subcategoriesToShow, setSubcategoriesToShow] = useState(5);
  const [startIdx, setStartIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sliderRef = useRef();

  const filteredContent =
    selectedCategory === "All"
      ? contentData
      : contentData.filter(
          (item) => item.blog_sub_category?.name === selectedCategory
        );

  const contentDataJson = JSON.stringify(contentData);

  const subcategories = [
    ...new Set(contentData.map((item) => item.blog_sub_category?.name)),
  ];
  subcategories.unshift("All");

  // Handle the click of the previous button
  const handlePrevious = () => {
    if (selectedCategory !== "All") {
      const currentIndex = subcategories.indexOf(selectedCategory);

      if (currentIndex !== -1) {
        // Calculate the previous index, considering "All" as a stop condition
        const previousIndex = currentIndex - 1;

        if (previousIndex >= 0) {
          const subCategory = subcategories[previousIndex];
          setSelectedCategory(subCategory?.toString());
          setStartIdx(
            previousIndex >= subcategoriesToShow
              ? previousIndex - subcategoriesToShow + 1
              : 0
          );
        }
      }
    }
  };

  // Handle the click of the next button
  const handleNext = () => {
    const currentIndex = subcategories.indexOf(selectedCategory);

    if (currentIndex !== -1) {
      // Calculate the next index by skipping "All" if it's the current selection
      const nextIndex = currentIndex === 0 ? 1 : currentIndex + 1;

      if (nextIndex < subcategories.length) {
        const subCategory = subcategories[nextIndex];
        setSelectedCategory(subCategory?.toString());
        setStartIdx(
          nextIndex >= subcategoriesToShow
            ? nextIndex - subcategoriesToShow + 1
            : 0
        );
      }
    }
  };

  const sliderSetting = {
    autoplay: false,
    infinite: filteredContent.length === 1 ? false : true,
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
        setMaxWidthForTopBigImage("70%");
      } else if (window.innerWidth >= 1024) {
        setMaxWidthForTopBigImage("50%");
      } else if (window.innerWidth >= 768) {
        setMaxWidthForTopBigImage("35%");
      } else if (window.innerWidth >= 425) {
        setMaxWidthForTopBigImage("95%");
      } else if (window.innerWidth >= 375) {
        setMaxWidthForTopBigImage("85%");
      } else if (window.innerWidth >= 320) {
        setMaxWidthForTopBigImage("60%");
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

  useEffect(() => {
    const handleSubcategoriesToShow = () => {
      // for subcategory filter buttons
      if (window.innerWidth >= 2560) {
        setSubcategoriesToShow(5);
      } else if (window.innerWidth >= 1440) {
        setSubcategoriesToShow(4);
      } else if (window.innerWidth >= 1024) {
        setSubcategoriesToShow(2);
      } else if (window.innerWidth >= 768) {
        setSubcategoriesToShow(1);
      } else {
        setSubcategoriesToShow(5);
      }
    };

    handleSubcategoriesToShow();

    // Attach event listener for window resize
    window.addEventListener("resize", handleSubcategoriesToShow);

    return () => {
      window.removeEventListener("resize", handleSubcategoriesToShow);
    };
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex mb-3">
          <div className="col">
            <h3 className="text-dark">
              <Link
                href={{
                  pathname: "/blog/blog-detail",
                  query: {
                    category: selectedCategory,
                    contentData: contentDataJson,
                    baseCategory:
                      contentData[0]?.blog_category?.blog_category_id,
                  },
                }}
              >
                <a className="text-dark">
                  {contentData[0]?.blog_category?.blog_category_id}
                </a>
              </Link>
            </h3>
          </div>
          <div className="col-8 fs-4 d-flex ">
            <button
              type="button"
              className="btn btn-sm quantity-right-plus border me-1 mt-1"
              data-type="plus"
              data-field=""
              onClick={handlePrevious}
            >
              <i className="ti-angle-left"></i>
            </button>
            {subcategories.length && (
              <button
                type="button"
                className="btn btn-sm quantity-right-plus border ms-1 me-2 mt-1"
                data-type="plus"
                data-field=""
                onClick={handleNext}
              >
                <i className="ti-angle-right"></i>
              </button>
            )}
            {subcategories
              .slice(startIdx, startIdx + subcategoriesToShow)
              .map((subCategory) => (
                <button
                  key={subCategory?.toString()}
                  className={`btn btn btn-link text-dark ${
                    selectedCategory === subCategory
                      ? "active bg-danger text-white"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(subCategory?.toString())}
                >
                  {subCategory?.toString()}
                </button>
              ))}
          </div>
          <div className="col-2"></div>
        </div>
      </div>

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
                      contentData[0].blog_category?.blog_category_id,
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
                          {content.title.substring(0, 40)}...
                        </a>
                        <p className="cn-description">
                          <span
                            className="d-flex text-dark"
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
                            <span>...</span>
                          </span>
                        </p>
                        <a className="cn-date text-dark">
                          <i className="far fa-clock text-dark"></i>
                          {content.created_at?.substring(0, 10)}
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

export default BlogMiniSlider;
