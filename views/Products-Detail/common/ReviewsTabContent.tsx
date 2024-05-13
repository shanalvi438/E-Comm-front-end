import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const ReviewsTabContent = () => {
 const [likeCount, setLikeCount] = useState(0);
 const [dislikeCount, setDislikeCount] = useState(0);

 const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
 };

 const handleDislikeClick = () => {
    setDislikeCount(dislikeCount + 1);
 };
 const [activeTab, setActiveTab] = useState("1");
 const labels = [
   "Excellent   ",
   "Very Good",
   "Recommended",
   "Not Good",
   "Very Bad",
 ];

 const values = [4521, 4520, 4519, 4518, 4517];
 return (
    <div>
      <h4>Customer Reviews (5264)</h4>
      <br />
      {/* review stars ...... */}
      <div className="row">
        <div className="col">
          <div className="average">
            <div className="container-star" style={{ display: "flex" }}>
              {[...Array(5)].map((_, starIndex) => (
                <img
                 key={starIndex}
                 className="star"
                 src="//laz-img-cdn.alicdn.com/tfs/TB19ZvEgfDH8KJjy1XcXXcpdXXa-64-64.png"
                 style={{
                    width: "33.25px",
                    height: "33.25px",
                    filter: starIndex < 4 ? "none" : "grayscale(100%)",
                 }}
                />
              ))}
              <span style={{ marginLeft: "20px", fontSize: "20px", fontWeight: "bold" }}>
                4.8
              </span>
            </div>
            <p style={{}}>All reviews replaced by verified customers</p>
          </div>
        </div>
        <div className="col">
          {/* Assuming labels and values are defined as in the original component */}
          {labels.map((label, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", alignItems: "center" }}>
              <span style={{ width: "100px", paddingRight: "10px" }}>{label}</span>
              {[...Array(5)].map((_, starIndex) => (
                <img
                 key={starIndex}
                 className="star"
                 src="//laz-img-cdn.alicdn.com/tfs/TB19ZvEgfDH8KJjy1XcXXcpdXXa-64-64.png"
                 style={{
                    width: "15.96px",
                    height: "15.96px",
                    filter: starIndex < 5 - rowIndex ? "none" : "grayscale(100%)",
                 }}
                />
              ))}
              <span style={{ paddingLeft: "10px" }}>({values[rowIndex]})</span>
            </div>
          ))}
        </div>
      </div>
      <hr />
      {/* review entered */}
      <div className="border border-gray-500 p-4 my-3" style={{ backgroundColor: "rgb(254 ,249,249)" }}>
        <div className="d-flex justify-content-between">
          <div className="mr-2">Malik Zubair</div>
          <div>07/02/2024</div>
        </div>

        <div className="d-flex">
          <div className="star">
            {[...Array(5)].map((_, starIndex) => (
              <img
                key={starIndex}
                className="star"
                src="//laz-img-cdn.alicdn.com/tfs/TB19ZvEgfDH8KJjy1XcXXcpdXXa-64-64.png"
                style={{
                 width: "15.96px",
                 height: "15.96px",
                 filter: starIndex < 5 ? "none" : "grayscale(100%)",
                }}
              />
            ))}
          </div>
          <div> Excellent</div>
        </div>
        <div className="mt-2 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, recusandae! Provident cumque repellat eos animi. Perspiciatis doloribus doloremque distinctio cumque maiores enim iste facilis, voluptatum fuga optio cum, maxime corporis.
        </div>
        <div className="d-flex justify-content-between mt-3">
          <div className="products gap-5">
            <img
              style={{
                width: "80px",
                height: "70px",
                paddingRight: "15px",
              }}
              src="/images/layout-2/rounded-cat/10.jpeg"
            ></img>
            <img
              style={{
                width: "80px",
                height: "70px",
                paddingRight: "15px",
              }}
              src="/images/layout-2/rounded-cat/10.jpeg"
            ></img>
            <img
              style={{
                width: "80px",
                height: "70px",
                paddingRight: "15px",
              }}
              src="/images/layout-2/rounded-cat/10.jpeg"
            ></img>
            <img
              style={{
                width: "80px",
                height: "70px",
                paddingRight: "15px",
              }}
              src="/images/layout-2/rounded-cat/10.jpeg"
            ></img>
          </div>
          <div className="mt-4">
            <FontAwesomeIcon
              icon={faThumbsUp}
              onClick={handleLikeClick}
              style={{
                cursor: "pointer",
                color: "green",
                fontSize: "24px",
              }}
            />
            <span className="mx-2 ml-2" style={{ fontSize: "18px" }}>
              {likeCount}
            </span>
            <FontAwesomeIcon
              icon={faThumbsDown}
              onClick={handleDislikeClick}
              style={{
                cursor: "pointer",
                color: "red",
                fontSize: "24px",
                marginLeft: "8px",
              }}
            />
            <span className="mx-2 ml-2" style={{ fontSize: "18px" }}>
              {dislikeCount}
            </span>
          </div>
        </div>
      </div>
    </div>
 );
};

export default ReviewsTabContent;
