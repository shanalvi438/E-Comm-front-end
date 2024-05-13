import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import DisplayItem from "./DisplayItem";
import axios from "axios";


const ShortDisplay: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [coupens, setCoupens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/d_product`);
        setProducts(res.data.DealProduct);
        setCoupens(res.data.Coupons);
        
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
      <section className="short-disply section-py-space ratio_asos product">
        <div className="custom-container bg-white">
          <div className="row">
            <div className="col-lg-6 mb-4 pb-3">
              <DisplayItem products={products} />
            </div>
            <div className="col-lg-6 mb-4 pb-3">
              <div className="single-producty ">
                <div className="coupens">
                  <div className="coupens-title">
                    <FontAwesomeIcon className="tag" icon={faTags} size="xl" />
                    <h6 className="product-title">
                      {coupens?.length} Offers availble
                    </h6>
                  </div>

                  <div className="offers">
                    <ul className="Offers-list">
                      {coupens &&
                        coupens.map((offer, index) => (
                          <li key={index}>
                            <span className="offer">{offer.coupon_code}</span>
                            <div className="offer-details">
                              <h5>{offer.coupon_title}</h5>

                              <p>
                                Start Date: {offer.start_date} Exp Date:
                                {offer.end_date}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShortDisplay;
