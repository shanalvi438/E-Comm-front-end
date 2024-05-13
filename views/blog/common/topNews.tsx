import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../utils/constants";
import { renderTinyMCEDataUnBold } from "utils/utility";

const TopNews = ({ contentData }) => {
  const contentDataJson = JSON.stringify(contentData);

  const contentDataArrayParsed = JSON.parse(contentDataJson);
  const contentDataWithoutLastItem = contentDataArrayParsed.slice(0, -1);
  const reversedContentData = contentDataWithoutLastItem.reverse();

  const [maxWidthForTopBigImage, setMaxWidthForTopBigImage] = useState("70%");
  const [maxWidthForTopRightSmallImages, setMaxWidthForTopRightSmallImages] =
    useState("70%");

  useEffect(() => {
    const handleResizeForTopBigImage = () => {
      // Adjust max-width based on window width
      if (window.innerWidth >= 2560) {
        setMaxWidthForTopBigImage("70%");
      } else if (window.innerWidth >= 1440) {
        setMaxWidthForTopBigImage("60%");
      } else if (window.innerWidth >= 1024) {
        setMaxWidthForTopBigImage("40%");
      } else if (window.innerWidth >= 768) {
        setMaxWidthForTopBigImage("30%");
      } else if (window.innerWidth >= 576) {
        setMaxWidthForTopBigImage("60%");
      } else if (window.innerWidth >= 425) {
        setMaxWidthForTopBigImage("40%");
      } else if (window.innerWidth >= 375) {
        setMaxWidthForTopBigImage("30%");
      } else if (window.innerWidth >= 320) {
        setMaxWidthForTopBigImage("25%");
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
    const handleResizeForTopRightSmallImages = () => {
      // Adjust max-width based on window width
      if (window.innerWidth >= 2560) {
        setMaxWidthForTopRightSmallImages("100%");
      } else if (window.innerWidth >= 1440) {
        setMaxWidthForTopRightSmallImages("90%");
      } else if (window.innerWidth >= 1024) {
        setMaxWidthForTopRightSmallImages("50%");
      } else if (window.innerWidth >= 768) {
        setMaxWidthForTopRightSmallImages("30%");
      } else if (window.innerWidth >= 576) {
        setMaxWidthForTopRightSmallImages("60%");
      } else if (window.innerWidth >= 425) {
        setMaxWidthForTopRightSmallImages("100%");
      } else if (window.innerWidth >= 375) {
        setMaxWidthForTopRightSmallImages("90%");
      } else if (window.innerWidth >= 320) {
        setMaxWidthForTopRightSmallImages("75%");
      } else {
        setMaxWidthForTopRightSmallImages("100%");
      }
    };

    // Initial setup
    handleResizeForTopRightSmallImages();

    // Attach event listener for window resize
    window.addEventListener("resize", handleResizeForTopRightSmallImages);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResizeForTopRightSmallImages);
    };
  }, []);

  return (
    <>
      <div className="mb-2">
        <Link
          href={{
            pathname: "/blog/blog-detail",
            query: {
              contentData: JSON.stringify(contentData),
              contentIndex: contentData.length - 1,
            },
          }}
        >
          <a>
            <h3 className="text-dark fw-bold">
              {contentData[0]?.blog_category.blog_category_id}
            </h3>
          </a>
        </Link>
      </div>

      <div className="row">
        <div className="col-md-6 tn-left">
          <Link
            href={{
              pathname: "/blog/blog-detail",
              query: {
                contentData: JSON.stringify(contentData),
                contentIndex: contentData.length - 1,
                baseCategory: contentData[0]?.blog_category.blog_category_id,
              },
            }}
          >
            <a>
              <div className="tn-img">
                <Image
                  className="blog-tn-img img-fluid"
                  src={`${BACKEND_URL}/${
                    contentData[contentData.length - 1]?.feature_image
                  }`}
                  width={786}
                  height={590}
                  objectFit="cover"
                />
                <div className="tn-content">
                  <div className="tn-content-inner">
                    <Link
                      href={{
                        pathname: "/blog/blog-detail",
                        query: {
                          contentData: JSON.stringify(reversedContentData),
                          contentIndex: 0,
                          baseCategory:
                            contentData[0]?.blog_category.blog_category_id,
                        },
                      }}
                    >
                      <>
                        <a className="tn-title fs-3">
                          <div
                            className="text-trim"
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              maxWidth:
                                maxWidthForTopBigImage /* Adjust this based on your layout needs */,
                            }}
                          >
                            {contentData[0]?.title.substring(0, 80)}
                          </div>
                        </a>
                        <a className="tn-description text-white">
                          <span className="d-flex">
                            <div
                              className="text-wrap"
                              style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                maxWidth:
                                  maxWidthForTopBigImage /* Adjust this based on your layout needs */,
                              }}
                            >
                              {renderTinyMCEDataUnBold(
                                contentData[0]?.description.substring(120, 210)
                              )}
                            </div>
                            <span>...</span>
                          </span>
                        </a>
                      </>
                    </Link>
                    <a className="tn-date">
                      <i className="far fa-clock"></i>
                      {contentData[0]?.created_at.substring(0, 10)}
                    </a>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className="col-md-6 tn-right">
          <div className="row">
            {reversedContentData.slice(0, 4).map((content, index) => (
              <div className="col-md-6" key={index}>
                <Link
                  href={{
                    pathname: "/blog/blog-detail",
                    query: {
                      contentData: JSON.stringify(reversedContentData),
                      contentIndex: index,
                      baseCategory:
                        contentData[0]?.blog_category.blog_category_id,
                    },
                  }}
                >
                  <a>
                    <div className="tn-img">
                      <Image
                        className="blog-tn-img img-fluid"
                        src={`${BACKEND_URL}/${content.feature_image}`}
                        width={381}
                        height={274}
                        objectFit="cover"
                      />

                      <div className="tn-content">
                        <div className="tn-content-inner">
                          <a
                            className="tn-title fw-bold"
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              maxWidth:
                                maxWidthForTopRightSmallImages /* Adjust this based on your layout needs */,
                            }}
                          >
                            {content.title.substring(0, 35)}...
                          </a>
                          <a className="tn-description text-white">
                            <span className="d-flex">
                              <div
                                className="text-wrap"
                                style={{
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  maxWidth:
                                    maxWidthForTopRightSmallImages /* Adjust this based on your layout needs */,
                                }}
                              >
                                {renderTinyMCEDataUnBold(
                                  content.description.substring(0, 90)
                                )}
                              </div>
                              <span>...</span>
                            </span>
                          </a>
                          <a className="tn-date">
                            <i className="far fa-clock"></i>
                            {content.created_at.substring(0, 10)}
                          </a>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNews;
