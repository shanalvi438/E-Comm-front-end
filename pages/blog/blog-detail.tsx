import React from "react";
import { NextPage } from "next";
import Layout1 from "../../views/layouts/layout1";
import BlogDetailPage from "views/blog/blogDetailPage";

const RightSidebar: NextPage = () => {
  return (
    <Layout1>
      <BlogDetailPage />
    </Layout1>
  );
};

export default RightSidebar;
