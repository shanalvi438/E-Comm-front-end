import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { renderTinyMCEDataUnBold } from "utils/utility";
import { BACKEND_URL } from "utils/constants";

const MenuNews = ({ contentData }) => {
  const [subcategoriesToShow, setSubcategoriesToShow] = useState(8);
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

  const contentDataWithoutLastItem = filteredContent.slice(0, -1);

  const reversedContentData = contentDataWithoutLastItem.reverse();

  const [maxWidthForTopBigImage, setMaxWidthForTopBigImage] = useState("70%");

  useEffect(() => {
    const handleResizeForTopBigImage = () => {
      // Adjust max-width based on window width
      if (window.innerWidth >= 2560) {
        setMaxWidthForTopBigImage("100%");
      } else if (window.innerWidth >= 320) {
        setMaxWidthForTopBigImage("85%");
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
        setSubcategoriesToShow(8);
      } else if (window.innerWidth >= 1440) {
        setSubcategoriesToShow(7);
      } else if (window.innerWidth >= 1024) {
        setSubcategoriesToShow(5);
      } else if (window.innerWidth >= 768) {
        setSubcategoriesToShow(2);
      } else {
        setSubcategoriesToShow(8);
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
      <div className="mb-1 d-flex">
        <Link
          href={{
            pathname: "/blog/blog-detail",
            query: {
              contentData: JSON.stringify(filteredContent),
              contentIndex: contentData.length - 1,
            },
          }}
        >
          <a>
            <h3 className="text-dark">
              {filteredContent[0]?.blog_category.blog_category_id}
            </h3>
          </a>
        </Link>
        <div className="col-7 fs-4 d-flex ms-3 ">
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
      </div>

      <div className="row mb-1">
        <div className="col-lg-6">
          {filteredContent.length > 0 ? (
            <>
              <div className="mn-img">
                <Link
                  href={{
                    pathname: "/blog/blog-detail",
                    query: {
                      contentData: JSON.stringify(filteredContent),
                      contentIndex: filteredContent.length - 1,
                      baseCategory:
                        filteredContent[0]?.blog_category.blog_category_id,
                    },
                  }}
                >
                  <a>
                    <Image
                      className="blog-mn-img img-fluid"
                      style={{ height: "380px", objectFit: "cover" }}
                      src={`${BACKEND_URL}/${
                        filteredContent[filteredContent.length - 1]
                          ?.feature_image
                      }`}
                      width={516}
                      height={390}
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
                      contentData: JSON.stringify(reversedContentData),
                      contentIndex: 0,
                      baseCategory:
                        filteredContent[0]?.blog_category.blog_category_id,
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
                    {filteredContent[
                      filteredContent.length - 1
                    ].title.substring(0, 38)}
                    ...
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
                        filteredContent[
                          filteredContent.length - 1
                        ].description.substring(0, 100)
                      )}
                    </span>
                    <span>...</span>
                  </span>
                </p>
                <a className="mn-date">
                  <i className="far fa-clock"></i>
                  {filteredContent[
                    filteredContent.length - 1
                  ].created_at.substring(0, 10)}
                </a>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="col-lg-6">
          {reversedContentData.slice(0, 5).map((data, index) => (
            <Link
              href={{
                pathname: "/blog/blog-detail",
                query: {
                  contentData: JSON.stringify(reversedContentData),
                  contentIndex: index,
                  baseCategory:
                    filteredContent[0].blog_category.blog_category_id,
                },
              }}
            >
              <a>
                <div className="mn-list">
                  <div className="mn-img">
                    <Image
                      className="blog-mn-img img-fluid"
                      style={{ height: "70px", objectFit: "cover" }}
                      src={`${BACKEND_URL}/${data.feature_image}`}
                      width={100}
                      height={70}
                      objectFit="cover"
                    />
                  </div>
                  <div className="mn-content">
                    <a
                      className="mn-title fw-bold"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth:
                          maxWidthForTopBigImage /* Adjust this based on your layout needs */,
                      }}
                    >
                      {data.title.substring(0, 50)}...
                    </a>
                    <a className="mn-description text-dark">
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
                            data.description.substring(0, 90)
                          )}
                        </span>
                        <span>...</span>
                      </span>
                    </a>
                    <a className="mn-date">
                      <i className="far fa-clock"></i>
                      {data.created_at.substring(0, 10)}
                    </a>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuNews;
