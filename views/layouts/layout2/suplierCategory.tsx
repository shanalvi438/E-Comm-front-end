import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Row, Col, Container, Media } from "reactstrap";
import Slider from "react-slick";
import axios from "axios";

var settings = {
  autoplay: true,
  autoplaySpeed: 1500,
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 9,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1367,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const Suplier: NextPage = () => {
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brands`
        );
        setBrandList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Invoke the async function
  }, []);

  function transformImageUrl(apiImageUrl) {
    if (apiImageUrl) {
      return  `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiImageUrl.replace(
        / /g,
        "%20"
      )}`;
    }
    return ""; // Handle the case where apiImageUrl is not defined
  }
  return (
    <>
      <div className="container-brands slide-6 no-arrow">
        <Slider {...settings}>
          {brandList &&
            brandList.map((data, i) => (
              <div className="category-contain" key={i}>
                <div className="img-wrapper">
                  <Media
                    src={transformImageUrl(data.logo)}
                    alt="category"
                    className="img-fluid brands-img"
                  />
                </div>
                {/* <div>
                          <div className="btn-rounded">{data.category}</div>
                </div> */}
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default Suplier;
// export {Supplier};
