import React, { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { CurrencyContext } from "../../../../../helpers/currency/CurrencyContext";
import { useTranslation } from "react-i18next";
import dataa from "../../../../../data/langConfig.json";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMessage } from "@fortawesome/free-solid-svg-icons";

const currencyData = {
  currency: [
    { currency: "USD", symbol: "$", value: "USD" },
    { currency: "Euro", symbol: "€", value: "EUR" },
  ],
};

const TopBar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [openLang, setOpenLang] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  const [openUsd, setOpenUsd] = useState(false);
  const currencyContext = useContext(CurrencyContext);
  const { selectedCurrency, selectedCurr } = currencyContext;
  const [lang, setSelectedLang] = useState({ lang: "English", val: "en" });
  const [url, setUrl] = useState("");
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang.val);
    setSelectedLang(lang);
    lang.val === "es"
      ? document.body.classList.add(lang.val)
      : document.body.classList.remove("es");
  };
  const toggleCurrency = () => {
    setOpenUsd(!openUsd);
  };

  const toggleLang = () => {
    setOpenLang(!openLang);
  };
  const closeNotifications = () => {
    setOpenNotifications(!false);
  };
  const toggleNotifications = () => {
    setOpenNotifications(!openNotifications);
  };
  useEffect(() => {
    const path = window.location.pathname.split("/");
    const urlTemp = path[path.length - 1];
    setUrl(urlTemp);
  }, []);

  return (
    <div
      className={`top-header ${url === "layout6" ? "top-header-inverse" : ""}`}
    >
      <div className="custom-container">
        <Row>
          <Col xl="5" md="7" sm="6">
            <div className="top-header-left">
              <div className="shpping-order">
                <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}`}>
                  <a target="__blank">
                    <h6>{t("Sell on Industry Mall")} </h6>
                  </a>
                </Link>
              </div>
              <div className="app-link">
                <h6>{t("Download app")}</h6>
                <ul>
                  <li>
                    <a>
                      <i className="fa fa-apple"></i>
                    </a>
                  </li>
                  <li>
                    <a>
                      <i className="fa fa-android"></i>
                    </a>
                  </li>
                  <li>
                    <a>
                      <i className="fa fa-windows"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col xl="7" md="5" sm="6">
            <div className="top-header-right">
              <div className="top-menu-block">
                <ul>
                  {/* <li>
                    <a href="./index.tsx" style={{ textDecoration: "none" }}>
                      <Link href="./Coupon.tsx">Discoun </Link>
                    </a>
                  </li> */}
                  <li>
                    <a
                      href="#"
                      onMouseEnter={toggleNotifications}
                      style={{ textDecoration: "none" }}
                    >
                      Notifications
                    </a>
                    <Dropdown
                      isOpen={openNotifications}
                      onMouseLeave={closeNotifications}
                      toggle={toggleNotifications}
                    >
                      <DropdownToggle tag="span"></DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className="bg-white">
                          <div
                            className=" shadow bg-white rounded"
                            style={{
                              maxHeight: "200px",
                              overflowY: "auto",
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            {[...Array(5)].map((_, index) => (
                              <div key={index} className="border-bottom p-2">
                                <div className="d-flex flex-column justify-content-between">
                                  <div className="d-flex ">
                                    <div
                                      className=""
                                      style={{ marginRight: "20px" }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faMessage}
                                        style={{
                                          fontSize: "14px",
                                          color: "var(--theme-color1)",
                                        }}
                                      />

                                      {/* <span style={{ height: '30px', display: 'inline-block', borderLeft: '1px solid black', verticalAlign:'center', margin:'2px', }}></span> */}
                                    </div>
                                    <div
                                      className=""
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                      }}
                                    >
                                      New msg here get it!
                                    </div>
                                  </div>
                                  <div
                                    className="d-flex justify-content-between"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <div
                                      className="mx-2"
                                      style={{ fontSize: "10px" }}
                                    >
                                      {new Date().toLocaleDateString()}
                                    </div>
                                    <div
                                      className="mx-2"
                                      style={{ fontSize: "10px" }}
                                    >
                                      {new Date().toLocaleTimeString()}
                                    </div>
                                  </div>
                                  <div style={{ marginLeft: "20px" }}>
                                    <p
                                      className=""
                                      style={{
                                        fontStyle: "italic",
                                        fontSize: "12px",
                                      }}
                                    >
                                      New msg received,read it.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className="text-center m-2">
                              <Link href="/notifications-page">
                                <button className="btn btn-primary btn-sm text-center">
                                  View More
                                </button>
                              </Link>
                            </div>
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </li>
                  <li>
                    <a href="#trackorder" style={{ textDecoration: "none" }}>
                      <Link href="/TrackOder">Track Order</Link>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="language-block">
                <div className="language-dropdown">
                  <Dropdown isOpen={openLang} toggle={toggleLang}>
                    <DropdownToggle
                      tag="span"
                      data-toggle="dropdown"
                      aria-expanded={openLang}
                      className="language-dropdown-click"
                    >
                      {lang.lang}
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </DropdownToggle>
                    <ul
                      className={`language-dropdown-open ${
                        openLang ? "" : "open"
                      }`}
                    >
                      {dataa.map((lang: any, i) => (
                        <li key={i}>
                          <a
                            href="#"
                            onClick={() => {
                              changeLanguage(lang);
                              toggleLang();
                            }}
                          >
                            {lang.lang}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Dropdown>
                </div>
                <div className="curroncy-dropdown">
                  <Dropdown isOpen={openUsd} toggle={toggleCurrency}>
                    <DropdownToggle
                      tag="span"
                      data-toggle="dropdown"
                      aria-expanded={openUsd}
                      className="curroncy-dropdown-click"
                    >
                      {selectedCurr.currency}
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </DropdownToggle>
                    <ul
                      className={`curroncy-dropdown-open ${
                        openUsd ? "" : "open"
                      }`}
                    >
                      {currencyData.currency.map((cur, i) => (
                        <li key={i}>
                          <div
                            onClick={() => {
                              selectedCurrency(cur);
                              toggleCurrency();
                            }}
                          >
                            <div>{cur.symbol}</div>
                            <div> {cur.currency}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Dropdown>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default TopBar;
