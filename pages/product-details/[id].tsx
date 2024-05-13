import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Layout1 from "../../views/layouts/layout1";
import LeftSidebarPage from "../../views/Products-Detail/leftSidebarPage";
// import { useSelector } from "react-redux";
// import { ProductState } from "store/product/reducers";
import { useRouter } from "next/router";
import ProductDetailPage from "pages/productdetailpage/productdetailpage";

const LeftSidebar: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  // const product = useSelector((state: ProductState) => state.product.product);

  return (
    <Layout1>
      <section className="section-big-pt-space bg-white">
        <ProductDetailPage id={id} />
      </section>
    </Layout1>
  );
};

export default LeftSidebar;
