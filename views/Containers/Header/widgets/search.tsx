import React, { useEffect, useState, useRef } from "react";
import { NextPage } from "next";
import Link from "next/link";

const Search: NextPage = () => {
  const [keyword, setKeyword] = useState("");
  const [resultItems, setResultItems] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search/product/${keyword}`
        );
        const data = await response.json();

        setResultItems(data.product);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [keyword]);

  useEffect(() => {
    console.log("resultItems", resultItems);
    console.log("keyword", keyword);
  }, [resultItems, keyword]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResultItems(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="input-block mb-3" ref={searchRef}>
      <div className="input-box">
        <div className="ps-form__input d-flex">
          <input
            className="form-control"
            type="text"
            value={keyword}
            placeholder="I'm shopping for..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="btn btn-normal"
            onClick={() => {
              setKeyword("");
            }}
          >
            Search
          </button>
        </div>

        {/* Product List */}
        {resultItems ? (
          resultItems && resultItems.length > 0 ? (
            <ul
              className="ps-form__input d-flex rounded-3 form-control"
              style={{
                listStyle: "none",
                padding: 0,
                marginTop: "100px",
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "50px",
                zIndex: 999,
                maxHeight: "400px",
                overflowY: "auto",
                width: "calc(90% - 58%)",
                boxSizing: "border-box",
              }}
            >
              {resultItems.slice(0, 10).map((product) => (
                <Link
                  href="/product-details/[id]"
                  as={`/product-details/${product.id}`}
                  key={product.id}
                >
                  <li
                    style={{
                      padding: "5px",
                      marginLeft: "15px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={product.url}
                      alt={product.name}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "contain",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <div>{product.name}</div>
                      <div>
                        <span
                          style={{
                            textDecoration: "line-through",
                            marginRight: "5px",
                          }}
                        >
                          ${product.new_price}
                        </span>
                        <span>${product.new_sale_price}</span>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p>No product found.</p>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
