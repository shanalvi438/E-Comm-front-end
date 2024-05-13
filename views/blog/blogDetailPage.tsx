import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { renderTinyMCEData } from "utils/utility";
import { BACKEND_URL } from "utils/constants";

const BlogDetailPage: NextPage = () => {
  const router = useRouter();
  const { contentData, contentIndex, baseCategory } = router.query;
  const index = Array.isArray(contentIndex) ? contentIndex[0] : contentIndex;
  const selectedBlogIndex = parseInt(index, 10);

  // Parse the contentData back to an array
  const parsedContentData = contentData
    ? JSON.parse(contentData as string)
    : [];

  const [selectedBlog, setSelectedBlog] = useState(
    !isNaN(selectedBlogIndex) &&
      selectedBlogIndex >= 0 &&
      selectedBlogIndex < parsedContentData.length
      ? parsedContentData[selectedBlogIndex]
      : parsedContentData[0]
  );

  const handleBlogClick = (blog: any) => {
    setSelectedBlog(blog);
  };

  const [maxWidthForTopBigImage, setMaxWidthForTopBigImage] = useState("70%");

  useEffect(() => {
    const handleResizeForTopBigImage = () => {
      // Adjust max-width based on window width
      if (window.innerWidth >= 2560) {
        setMaxWidthForTopBigImage("70%");
      } else if (window.innerWidth >= 1440) {
        setMaxWidthForTopBigImage("50%");
      } else if (window.innerWidth >= 1024) {
        setMaxWidthForTopBigImage("30%");
      } else if (window.innerWidth >= 768) {
        setMaxWidthForTopBigImage("15%");
      } else if (window.innerWidth >= 425) {
        setMaxWidthForTopBigImage("60%");
      } else if (window.innerWidth >= 375) {
        setMaxWidthForTopBigImage("55%");
      } else if (window.innerWidth >= 320) {
        setMaxWidthForTopBigImage("40%");
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
    <div className="bg-light">
      {/* <!-- section start --> */}
      <section className="section-big-py-space blog-page ratio2_3">
        <div className="custom-container">
          <div>
            {/* Breadcrumb Start */}
            <div className="breadcrumb-wrap">
              <div className="container-fluid">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/blog/blogs">Blogs</Link>
                  </li>
                  <li className="breadcrumb-item active">Blogs Detail</li>
                </ul>
              </div>
            </div>
            {/* Breadcrumb End */}

            {/* Single News Start*/}
            <div className="single-news">
              <div className="container-fluid">
                <div className="row d-flex justify-content-between">
                  <div className="col-md-9" id="displaySelectedBlog">
                    <div className="sn-img">
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        width={1600}
                        height={900}
                        className="img-fluid"
                        src={`${BACKEND_URL}/${selectedBlog?.feature_image}`}
                        objectFit="cover"
                      />
                    </div>
                    <div className="sn-content">
                      <a className="sn-title">{selectedBlog?.title}</a>
                      <span className="d-flex">
                        <span>{selectedBlog?.blog_sub_category?.name}</span>
                        <p>&nbsp;/&nbsp;</p>
                        <a className="sn-date">
                          <i className="far fa-clock" />
                          {selectedBlog?.created_at.substring(0, 10)}
                        </a>
                      </span>
                      <p className="col-11">
                        {renderTinyMCEData(selectedBlog?.description)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3" id="listOfBlogs">
                    <div style={{ cursor: "pointer" }} className="sidebar">
                      <div className="sidebar-widget">
                        <h2 className="fs-3">
                          {baseCategory
                            ? baseCategory
                            : selectedBlog?.blog_category?.blog_category_id}
                        </h2>
                        <div className="col-md-12 custom-scroll-container scroll-content">
                          <div className="row d-flex flex-column">
                            <div className="top-news">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-md-12 tn-right">
                                    <div className="row d-flex flex-column">
                                      {parsedContentData.map((blog, index) => (
                                        <div
                                          key={index}
                                          className="col-md-12 mb-3"
                                          onClick={() => handleBlogClick(blog)}
                                        >
                                          <div className="tn-img">
                                            <Image
                                              width={357}
                                              height={200}
                                              className="blog-tn-img img-fluid"
                                              src={`${BACKEND_URL}/${blog?.feature_image}`}
                                              objectFit="cover"
                                            />
                                            <div className="tn-content">
                                              <div className="tn-content-inner">
                                                <a
                                                  className="tn-title"
                                                  style={{
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                    maxWidth:
                                                      maxWidthForTopBigImage /* Adjust this based on your layout needs */,
                                                  }}
                                                >
                                                  {blog.title.substring(0, 55)}
                                                  ...
                                                </a>
                                                <a className="tn-description text-white">
                                                  <span className="d-flex">
                                                    <span
                                                      style={{
                                                        overflow: "hidden",
                                                        whiteSpace: "nowrap",
                                                        textOverflow:
                                                          "ellipsis",
                                                        maxWidth:
                                                          maxWidthForTopBigImage /* Adjust this based on your layout needs */,
                                                      }}
                                                    >
                                                      {renderTinyMCEData(
                                                        blog.title.substring(
                                                          0,
                                                          50
                                                        )
                                                      )}
                                                    </span>
                                                    <span>...</span>
                                                  </span>
                                                </a>
                                                <a className="tn-date">
                                                  <i className="far fa-clock"></i>
                                                  {blog.created_at.substring(
                                                    0,
                                                    10
                                                  )}
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Single News End*/}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
