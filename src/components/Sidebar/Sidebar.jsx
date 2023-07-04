import { Dashboard } from "@mui/icons-material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {Avatar} from "@mui/material";
import { useSelector } from "react-redux";

function Sidebar() {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.user);

  let currentPath = location.pathname.split("/");
  let path="Home";
  if (currentPath.length > 2) {
    currentPath = currentPath[2];
    path=currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
  } else {
    currentPath = "dashboard";
  }
  const activeBtnStyle =
    "flex gap-2 p-2 bg-[#7AC93B] rounded-sm ring-4 ring-[#7AC93B] shadow-xl shadow-indigo-500/30 transition duration-100 ease-in-out";
  const btnStyle =
    "flex gap-2 p-2 lg:w-[146px] w-full hover:bg-[#e1e1e6] rounded-md transition duration-100 ease-in-out";
    
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <nav className="lg:hidden md:hidden flex items-center justify-between py-2 z-20 shadow-lg px-2">
      <div className="text-black flex items-center justify-center gap-2 ">
      <div
          className={`lg:hidden md:hidden absolute top-14 bg-white p-2 z-10 left-0 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="grid gap-4 px-2 py-2">
          <Link
            to=""
            className={`${
              currentPath === "dashboard" ? activeBtnStyle : btnStyle
            }`}
          >
            <img
              src="/Logos/Dashboard.svg"
              alt="img"
              style={{
                filter:
                  currentPath === "dashboard"
                    ? "invert(1) brightness(150%)"
                    : "none",
              }}
            />
            <div
              className={`${
                currentPath === "dashboard"
                  ? "text-white px-3"
                  : "text-gray-600 px-3"
              } font-poppins font-semibold`}
            >
              Home
            </div>
          </Link>
          <Link
            to="/dashboard/tracking"
            className={currentPath === "tracking" ? activeBtnStyle : btnStyle}
          >
            <img
              src="/Logos/Orders.svg"
              alt="img"
              style={{
                filter:
                  currentPath === "tracking"
                    ? "invert(1) brightness(150%)"
                    : "none",
              }}
            />
            <div
              className={`${
                currentPath === "tracking"
                  ? "text-white px-3"
                  : "text-gray-600 px-3"
              } font-poppins font-semibold`}
            >
              Tracking
            </div>
          </Link>
          <Link
            to="/dashboard/chat"
            className={currentPath === "chat" ? activeBtnStyle : btnStyle}
          >
            <img
              src="/Logos/Products.svg"
              alt="img"
              style={{
                filter:
                  currentPath === "chat"
                    ? "invert(1) brightness(150%)"
                    : "none",
              }}
            />
            <div
              className={`${
                currentPath === "chat"
                  ? "text-white px-3"
                  : "text-gray-600 px-3"
              } font-poppins font-semibold`}
            >
              Chats
            </div>
          </Link>
          <Link
            to="/dashboard/orders"
            className={currentPath === "orders" ? activeBtnStyle : btnStyle}
          >
            <img
              src="/Logos/Analytics (1).svg"
              alt="img"
              style={{
                filter:
                  currentPath === "orders"
                    ? "invert(1) brightness(150%)"
                    : "none",
              }}
            />
            <div
              className={`${
                currentPath === "orders"
                  ? "text-white px-3"
                  : "text-gray-600 px-3"
              } font-poppins font-semibold`}
            >
              Orders
            </div>
          </Link>
          <Link
            to="/dashboard/wallet"
            className={currentPath === "wallet" ? activeBtnStyle : btnStyle}
          >
            <img
              src="/Logos/Customers (1).svg"
              alt="img"
              style={{
                filter:
                  currentPath === "wallet"
                    ? "invert(1) brightness(150%)"
                    : "none",
              }}
            />
            <div
              className={`${
                currentPath === "wallet"
                  ? "text-white px-3"
                  : "text-gray-600 px-3"
              } font-poppins font-semibold`}
            >
              Wallet
            </div>
          </Link>
        </div>
        <div className="grid gap-10 py-28">
          <div className="grid gap-4">
            <Link
              to="/dashboard/setting"
              className={currentPath === "setting" ? activeBtnStyle : btnStyle}
            >
              <img
                src="/Logos/Customers.svg"
                alt="img"
                style={{
                  filter:
                    currentPath === "setting"
                      ? "invert(1) brightness(150%)"
                      : "none",
                }}
              />
              <div
                className={`${
                  currentPath === "setting"
                    ? "text-white px-3"
                    : "text-gray-600 px-3"
                } font-poppins font-semibold`}
              >
                Setting
              </div>
            </Link>
            <Link
              to="/dashboard/support"
              className={currentPath === "support" ? activeBtnStyle : btnStyle}
            >
              <img
                src="/Logos/support.png"
                alt="img"
                style={{
                  filter:
                    currentPath === "support"
                      ? "invert(1) brightness(150%)"
                      : "none",
                }}
              />
              <div
                className={`${
                  currentPath === "support"
                    ? "text-white px-3"
                    : "text-gray-600 px-3"
                } font-poppins font-semibold`}
              >
                Support
              </div>
            </Link>
          </div>
        </div>
        </div>
        <button
              type="button"
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md"
            ><MenuIcon/></button>
        <img src="/Logos/Logo.svg" alt="img" className="w-16" />
      </div>
        <h1 className="text-xl font-bold text-gray-400">{path}</h1>
        <div className="flex flex-row gap-4 text-[#7AC93B]">
          <NotificationsIcon
              fontSize="large"
            ></NotificationsIcon>
          <Avatar alt="Radhakrishn" src="/static/images/avatar/3.jpg" />
          <p className="text-[#8A8A8A] text-xl">{currentUser.name}</p>
        </div>
    </nav>
    <div className="bg-white h-screen justify-between lg:w-[196px] w-[105px] px-4 border-r-2 border-grey-100 lg:flex md:flex hidden flex-col items-center shadow-sm z-50">
      <div>
        <img src="/Logos/Logo.svg" alt="img" className=" pt-8 lg:w-24 w-12" />
      </div>

      <div className="flex flex-col w-9 justify-evenly items-center mt-[30%]">
        <div className="grid gap-4">
          <Link
            to=""
            className={`${
              currentPath === "dashboard" ? activeBtnStyle : btnStyle
            }`}
          >
            <img
              src="/Logos/Dashboard.svg"
              alt="img"
              style={{
                filter:
                  currentPath === "dashboard"
                    ? "invert(1) brightness(150%)"
                    : "none",
              }}
            />
            <div
              className={`lg:block hidden ${
                currentPath === "dashboard"
                  ? "text-white px-3"
                  : "text-gray-600 px-3"
              } font-poppins font-semibold`}
            >
              Home
            </div>
          </Link>
          <Link
            to="/dashboard/tracking"
            className={currentPath === "tracking" ? activeBtnStyle : btnStyle}
          >
            <img
              src="/Logos/Orders.svg"
              alt="img"
              style={{
                filter:
                  currentPath === "tracking"
                    ? "invert(1) brightness(150%)"
                    : "none",
              }}
            />
            <div
              className={`lg:block hidden ${
                currentPath === "tracking"
                  ? "text-white px-3"
                  : "text-gray-600 px-3"
              } font-poppins font-semibold`}
            >
              Tracking
            </div>
          </Link>
          <Link
            to="/dashboard/chat"
            className={currentPath === "chat" ? activeBtnStyle : btnStyle}
          >
            <img
              src="/Logos/Products.svg"
              alt="img"
              style={{
                filter:
                  currentPath === "chat"
                    ? "invert(1) brightness(150%)"
                    : "none",
              }}
            />
            <div
              className={`lg:block hidden ${
                currentPath === "chat"
                  ? "text-white px-3"
                  : "text-gray-600 px-3"
              } font-poppins font-semibold`}
            >
              Chats
            </div>
          </Link>
          <Link
            to="/dashboard/orders"
            className={currentPath === "orders" ? activeBtnStyle : btnStyle}
          >
            <img
              src="/Logos/Analytics (1).svg"
              alt="img"
              style={{
                filter:
                  currentPath === "orders"
                    ? "invert(1) brightness(150%)"
                    : "none",
              }}
            />
            <div
              className={`lg:block hidden ${
                currentPath === "orders"
                  ? "text-white px-3"
                  : "text-gray-600 px-3"
              } font-poppins font-semibold`}
            >
              Orders
            </div>
          </Link>
          <Link
            to="/dashboard/wallet"
            className={currentPath === "wallet" ? activeBtnStyle : btnStyle}
          >
            <img
              src="/Logos/Customers (1).svg"
              alt="img"
              style={{
                filter:
                  currentPath === "wallet"
                    ? "invert(1) brightness(150%)"
                    : "none",
              }}
            />
            <div
              className={`lg:block hidden ${
                currentPath === "wallet"
                  ? "text-white px-3"
                  : "text-gray-600 px-3"
              } font-poppins font-semibold`}
            >
              Wallet
            </div>
          </Link>
        </div>

        <div className="grid gap-10 py-28">
          <div className="grid gap-4">
            <Link
              to="/dashboard/setting"
              className={currentPath === "setting" ? activeBtnStyle : btnStyle}
            >
              <img
                src="/Logos/Customers.svg"
                alt="img"
                style={{
                  filter:
                    currentPath === "setting"
                      ? "invert(1) brightness(150%)"
                      : "none",
                }}
              />
              <div
                className={`lg:block hidden ${
                  currentPath === "setting"
                    ? "text-white px-3"
                    : "text-gray-600 px-3"
                } font-poppins font-semibold`}
              >
                Setting
              </div>
            </Link>
            <Link
              to="/dashboard/support"
              className={currentPath === "support" ? activeBtnStyle : btnStyle}
            >
              <img
                src="/Logos/support.png"
                alt="img"
                style={{
                  filter:
                    currentPath === "support"
                      ? "invert(1) brightness(150%)"
                      : "none",
                }}
              />
              <div
                className={`lg:block hidden ${
                  currentPath === "support"
                    ? "text-white px-3"
                    : "text-gray-600 px-3"
                } font-poppins font-semibold`}
              >
                Support
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Sidebar;
