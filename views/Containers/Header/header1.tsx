import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Badge } from "reactstrap";
import TopBar from "./widgets/TopBar";
import {
  faChartSimple,
  faCodeCompare,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Search from "./widgets/search";
import ShoppingCart from "./widgets/shopping-cart";
import UserOptions from "./widgets/user-signedInOption";
import { CompareContext } from "helpers/compare/compare.context";
import WishList from "./widgets/whishlist";
import { NextPage } from "next";
import MobileSearch from "./widgets/mobile-search";
import MobileSetting from "./widgets/mobile-setting";
import { MenuContext } from "helpers/menu/MenuContext";
import Image from "next/image";
import Link from "next/link";
import UserProfile from "./widgets/user-profile";
import Compare from "views/pages/compare/comparePage";

interface HeaderProps {
  cartPopupPosition: string;
  display: string;
  category: any;
  layoutLogo: string;
}

const Header: NextPage<HeaderProps> = ({ cartPopupPosition, display }) => {
  const menuContext = useContext(MenuContext);
  const [userLoggedOut, setUserLoggedOut] = useState(false);
  const { compareItems } = React.useContext(CompareContext);
  const { setLeftMenu, leftMenu } = menuContext;

  const handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number >= 300) {
      if (window.innerWidth < 581)
        document.getElementById("stickyHeader").classList.remove("sticky");
      else document.getElementById("stickyHeader").classList.add("sticky");
    } else document.getElementById("stickyHeader").classList.remove("sticky");
  };

  useEffect(() => {
    if (userLoggedOut) {
      setUserLoggedOut(false);
    }
  }, [userLoggedOut]);

  return (
    <div className="custom-container">
      {/* <header id="stickyHeader "> */}
      <div className="  mobile-fix-option "></div>
      <TopBar />
      <div className="layout-header2">
        <div className="">
          <Row className="align-items-center justify-content-between">
            {/* First Column */}
            <Col xs={12} sm={4} md={4} lg={2}>
              <div className="main-menu-block">
                <div className="logo-block">
                  <Link href="/">
                    <a>
                      <Image
                        src={`/images/layout-2/logo/im-logo.png`}
                        className="img-fluid logo "
                        width="200px"
                        height="100%"
                        alt="logo"
                        layout="intrinsic"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
            {/* Second Column */}
            <Col
              xs={12}
              sm={8}
              md={8}
              lg={4}
              className="d-none d-sm-block      "
            >
              <Search />
            </Col>

            {/* Third Column */}
            <Col xs={12} sm={4} md={4} lg={2}>
              <div className="category-header-2 bg-white d-flex  align-items-center">
                <div className="navbar-menu">
                  <div className="category-left main-menu-block">
                    <div
                      className="mt-3 navbar-menu d-none d-sm-block"
                      style={{ position: "relative" }}
                    >
                      <Link href="/pages/compare/compare-1">
                        <a>
                          <img src="/images/menubar-icons/compare.png" alt="" />
                          <div
                            className="cart-product text-center align-items-center"
                            style={{
                              position: "absolute",
                              top: "-1.0rem",
                              right: "0px",
                              backgroundColor: "var(--theme-color1)",
                              color: "white",
                              borderRadius: "50%",
                              height: "15px",
                              width: "15px",
                              fontSize: "12px",
                            }}
                          >
                            {compareItems.length}
                          </div>
                        </a>
                      </Link>
                    </div>

                    <div className="mt-3">
                      <ShoppingCart
                        position={cartPopupPosition}
                        cartDisplay={display}
                        layout="layout2"
                      />
                    </div>

                    <div className="icon-block ">
                      <ul className="d-flex">
                        <li className=" mx-2">
                          <WishList />
                        </li>
                        <li className="d-block d-sm-none ">
                          <UserProfile />
                        </li>
                        <li className="d-none d-sm-block ">
                          <UserOptions />
                        </li>

                        <li className="d-block d-sm-none">
                          <MobileSearch />
                        </li>
                        <li>
                          <MobileSetting />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            {/* Fourth Column */}
            <Col xs={12} sm={8} md={8} lg={2}>
              <div
                id="trackorder"
                className="input-group mb-3 rounded rounded-pill shadow-sm"
                style={{ backgroundColor: "#0272BC" }}
              >
                <input
                  type="text"
                  className="form-control rounded-pill m-1"
                  placeholder="Track Order"
                  aria-describedby="basic-addon2"
                  style={{
                    borderColor: "#0272BC",
                  }}
                />
                <div className="input-group-append">
                  <button
                    className="input-group-text rounded-pill"
                    id="basic-addon2"
                    style={{
                      backgroundColor: "#0272BC",
                      color: "white",
                      borderColor: "#0272BC",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ fontSize: "20px" }}
                    />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/* </header> */}
    </div>
  );
};

export default Header;
