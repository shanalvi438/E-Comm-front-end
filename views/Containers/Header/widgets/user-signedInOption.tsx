import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";

interface user {
  first_name: any;
  last_name: any;
}
const UserSignedInOption: NextPage = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Replace with your authentication state logic
  const router = useRouter();

  const handleLogout = async (e) => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("order-sucess-items");
    Cookies.remove("token");
    Cookies.remove("id");
    setUserLoggedIn(false);
    router.push("/");
    toast.success("You have been Signed out successfully!");
  };

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const [userData, setUserData] = useState<user>({
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    axios
      .get( `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("token") !== null;
    setUserLoggedIn(isUserLoggedIn);

    if (!isUserLoggedIn) {
    }
  }, []);

  return (
    <>
      <span className="mobile-user onhover-dropdown ">
        <div className="dropdown">
          <button className="dropbtn mt-3 ">
            {/* <i className="icon-user"></i> */}
            <img src="/images/menubar-icons/profile.png" alt="" />
          </button>
          <div className="dropdownContent">
            {userLoggedIn ? (
              <>
                <span className="d-flex">
                  <span className="col-8 my-3 mx-2">
                    <h5 style={{ color: "#0272BC" }}>
                      {userData?.first_name} {userData?.last_name}
                    </h5>
                  </span>
                  <span className="col-3 m-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mx-2"
                      size="2xl"
                      style={{ color: "#0272BC" }}
                    />
                  </span>
                </span>
                <Link href="/">
                  <a onClick={handleLogout}>
                    <span className="btn-sm btn btn-outline-primary">
                      Sign Out
                    </span>
                  </a>
                </Link>
                <hr className="m-2" />
                <span className="myLink">
                  <Link href="/pages/account/dashboard">
                    <span className="ms-2">My Account</span>
                  </Link>
                </span>
                <span className="myLink">
                  <Link href="/pages/order-history">
                    <span className="ms-2">My Orders</span>
                  </Link>
                </span>
                <span className="myLink">
                  <Link href="/pages/account/dashboard">
                    <span className="ms-2">Payment</span>
                  </Link>
                </span>
                <span className="myLink">
                  <Link href="/pages/account/wishlist">
                    <span className="ms-2">Wish List</span>
                  </Link>
                </span>
                <span className="myLink mb-1">
                  <Link href="/pages/account/cart">
                    <span className="ms-2">My Cart</span>
                  </Link>
                </span>
              </>
            ) : (
              <>
                <span className="text-center">
                  <p className="p-2 fs-6">Welcome to Industry Mall!</p>
                </span>
                <span className="d-flex justify-content-center">
                  <Link
                    href="/pages/account/register"
                    className=" text-white m-0 p-0 d-flex justify-content-center test"
                    id="test"
                  >
                    <button className="btn btn-outline-success btn-sm fw-bold">
                      Register
                    </button>
                  </Link>
                  <span className="me-4"></span>
                  <Link
                    href="/pages/account/login"
                    className="text-white m-0 p-0 d-flex justify-content-center test"
                  >
                    <button className="btn btn-primary btn-sm fw-bold">
                      Login
                    </button>
                  </Link>
                </span>
                <hr className="m-2" />
                <span className="myLink">
                  <Link href="/pages/account/dashboard">
                    <span className="ms-2">My Account</span>
                  </Link>
                </span>
                <span className="myLink">
                  <Link href="/pages/account/dashboard">
                    <span className="ms-2">My Orders</span>
                  </Link>
                </span>
                <span className="myLink">
                  <Link href="/pages/account/dashboard">
                    <span className="ms-2">Payment</span>
                  </Link>
                </span>
                <span className="myLink">
                  <Link href="/pages/account/wishlist">
                    <span className="ms-2">Wish List</span>
                  </Link>
                </span>
                <span className="myLink">
                  <Link href="/pages/account/cart">
                    <span className="ms-2">My Cart</span>
                  </Link>
                </span>
              </>
            )}
          </div>
        </div>
      </span>
    </>
  );
};

export default UserSignedInOption;
