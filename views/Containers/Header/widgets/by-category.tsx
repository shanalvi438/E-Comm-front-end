import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { MenuContext } from "helpers/menu/MenuContext";
import Link from "next/link";

interface byCategory {
  category: [];
}
const ByCategory: NextPage<byCategory> = ({ category }) => {
  const [showState, setShowState] = useState(category || false);
  const [menuData, setMenuData] = useState([]);
  const { t } = useTranslation();
  const menuContext = useContext(MenuContext);
  const { leftMenu, setLeftMenu } = menuContext;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/menus`)
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [categories, setCategories] = useState({});

  // Function to fetch subcategories for a category
  const fetchCategories = async (menuId) => {
    const response = await fetch(
      `https://18.235.14.45/api/categories/${menuId}`
    );
    const data = await response.json();
    setCategories((prev) => ({ ...prev, [menuId]: data.data }));
  };

  return (
    <>
      <div className="nav-block" onClick={() => setShowState(!showState)}>
        <div className="nav-left">
          <nav
            className="navbar"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
          >
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setShowState(!showState)}
            >
              <span className="navbar-icon">
                <i className="fa fa-arrow-down"></i>
              </span>
            </button>
            <h5 className="mb-0  text-white title-font">
              {" "}
              {t("shopByCategory")}
            </h5>
          </nav>
          <div
            className={`collapse  nav-desk ${showState ? "show" : ""}`}
            id="navbarToggleExternalContent"
          >
            <a
              href="#"
              onClick={() => {
                setLeftMenu(!leftMenu);
                document.body.style.overflow = "visible";
              }}
              className={`overlay-cat ${leftMenu ? "showoverlay" : ""}`}
            ></a>
            <ul className={`nav-cat title-font ${leftMenu ? "openmenu" : ""}`}>
              <li
                className="back-btn"
                onClick={() => {
                  setLeftMenu(!leftMenu);
                  document.body.style.overflow = "visible";
                }}
              >
                <a>
                  <i className="fa fa-angle-left"></i>Back
                </a>
              </li>
              {menuData.map((menu) => (
                <li
                  key={menu.id}
                  onMouseEnter={() => fetchCategories(menu.id)}
                  onMouseLeave={() =>
                    setCategories({ ...categories, [menu.id]: [] })
                  } // Hide subcategories on mouse leave
                >
                  <Link
                    href={`/collections/leftsidebar?menu=${menu.name}`}
                    as={`/collections/leftsidebar/${menu.name}`}
                  >
                    <a>
                      <span>{menu.name}</span>
                    </a>
                  </Link>
                  {/* Subcategories show karega agar woh fetch hui hain */}
                  {categories[menu.id] && (
                    <ul className="text-primary">
                      {categories[menu.id].map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={`/collections/leftsidebar?category=${sub.name}`}
                            as={`/collections/leftsidebar/${sub.name}`}
                          >
                            <a>{sub.name}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ByCategory;
