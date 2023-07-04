import React, { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openFeedbackModal,
  openProductFormModal,
  openProfileChangeModal,
  openAuthModal,
} from "../redux/store/modalSlice";

export default function Footer() {
  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  return (
    <div className="px-6 pt-10 md:px-20 md:pt-14 text-white bg-[#373C29]">
      <section className="">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-6 md:gap-0 md:grid-cols-5">
            <div className="grid gap-2  mt-4 md:mt-0">
              <h5 className="font-bold text-[#fffefeed]">About Us</h5>
              <p>
                <Link
                  to="/who-are-we"
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none" }}
                >
                  About our Company
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Blogs/Stories
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Media Press
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Terms & Conditions
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Return & Cancellation Policy
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Ship & Delivery Policy
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div
              className="grid gap-2  mt-4 md:mt-0"
              style={{ height: "fit-content" }}
            >
              <h5 className="font-bold text-[#fffefeed]">Need Help</h5>
              <p>
                <Link
                  to="tel:9988909052"
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none" }}
                >
                  Call us
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  onClick={() => {
                    dispatch(openFeedbackModal());
                  }}
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none" }}
                >
                  Feedback
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Complaints
                </Link>
              </p>
              <p>
                <Link
                  to="/faq"
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none" }}
                >
                  FAQ
                </Link>
              </p>
            </div>
            <div
              className="grid gap-2 mt-4 md:mt-0"
              style={{ height: "fit-content" }}
            >
              <h5 className="font-bold text-[#fffefeed]">For Sellers</h5>
              <p>
                <Link
                  to=""
                  onClick={() => {
                    if (!currentUser) {
                      dispatch(openAuthModal());
                    } else if (currentUser.userType === 0) {
                      dispatch(openProfileChangeModal(1));
                    } else {
                      dispatch(openProductFormModal());
                    }
                  }}
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none" }}
                >
                  Sell on Fuelcab
                </Link>
              </p>
              <p>
                <Link
                  to="/products"
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none" }}
                >
                  Search Verified Leads
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Get Membership
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Ship with Fuelcab
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Get Freight Quotes
                </Link>
              </p>
            </div>
            <div
              className={`grid gap-2  mt-4 md:mt-0`}
              style={{ height: "fit-content" }}
            >
              <h4 className="font-bold text-[#fffefeed]">For Buyers</h4>
              <p>
                <Link
                  to="/products"
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none" }}
                >
                  Search Suppliers/Products{" "}
                </Link>
              </p>
              <p>
                <Link
                  to="#product-requirement-form"
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none" }}
                >
                  Post Your Requirements{" "}
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Book Your Logistics{" "}
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Pay with Fuelcab{" "}
                </Link>
              </p>
            </div>
            <div
              className={`grid gap-2  mt-4 md:mt-0`}
              style={{ height: "fit-content" }}
            >
              <h5 className="font-bold text-[#fffefeed]">Partner With us</h5>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Logistics Partnership{" "}
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  FuelEnt/DDD Partnership{" "}
                </Link>
              </p>
              <p>
                <Link
                  to=""
                  className=" hover:text-slate-300 text-sm"
                  style={{ textDecoration: "none", cursor: "not-allowed" }}
                >
                  Fuel Station Partnership{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div>
        <div className="flex justify-center md:justify-between border-t-1 border-[#fffefeed] mt-[18px] md:mt-8">
          <p className="my-[18px] md:my-4 text-[#fffefeed] font-bold">
            © 2023 FuelCab. All Rights Reserved
          </p>
          <div className="lg:block hidden">
            <div className="grid grid-cols-4 gap-4 my-4">
              <a href="/" className="me-2 text-reset">
                <LinkedInIcon />
              </a>
              <a href="/" className="me-2 text-reset">
                <FacebookIcon />
              </a>
              <a href="/" className="me-3 text-reset">
                <InstagramIcon />
              </a>
              <a href="/" className="me-2 text-reset">
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
