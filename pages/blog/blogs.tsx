import React from "react";
import { NextPage } from "next";
import Layout1 from "../../views/layouts/layout1";
import BlogsPage from "views/blog/blogsPage";

const Blogs: NextPage = () => {
  return (
    <Layout1>
      <BlogsPage />
    </Layout1>
  );
};

export default Blogs;
