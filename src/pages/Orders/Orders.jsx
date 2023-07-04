import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  where,
  query,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Button from "../../components/UIElements/Button";
import { Link } from "react-router-dom";
import { PAYMENT_MODES } from "../../constants/transaction";
import { USER_TYPES } from "../../constants/user";
import { DELIVERY_STATUS } from "../../constants/delivery";
import { Avatar} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const userType = "buyer";

function Order() {
  const DatePicker = ({ date, setDate }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <input
          value={format(date, "MM/dd/yyyy")}
          readOnly
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-transparent font-roboto text-sm text-[#717171] outline-none cursor-pointer"
          placeholder="22/01/2023"
        />
        {isOpen && (
          <div
            className="relative z-50"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <Calendar
              date={date}
              onChange={(d) => setDate(d)}
              className="absolute mt-[12px] ml-[-80px] rounded-xl"
            />
          </div>
        )}
      </>
    );
  };
  const [basicActive, setBasicActive] = useState("tab1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [bg, changeBGColor] = React.useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  const { orders } = useSelector((s) => s.orders);
  const currentUser = useSelector((state) => state.auth.user);

  const [sorting, setSorting] = useState(false);
  const sortData = async () => {
    setSorting(!sorting);
  };
  const [filter, setFilter] = useState(1);
  const selectFilter = async (selector) => {
    const p = await selector;
    setFilter(p);
    sortData();
  };
  const [info, setInfo] = useState([]);
  const handleCompletedClick = () => {
    const completedOrders = orders.filter(
      (order) => order.status === "Delivered"
    );
    setInfo(completedOrders);
  };

  const handleCancelledClick = () => {
    const cancelledOrders = orders.filter(
      (order) => order.status === "Cancelled"
    );
    setInfo(cancelledOrders);
  };

  const handleAllClick = () => {
    setInfo(orders);
  };

  useEffect(() => {
    setInfo(orders);
  }, [orders]);

  // const createOrder = async () => {
  //   const addressesCollectionRef = collection(db, "orders");
  //   try {
  //     await addDoc(addressesCollectionRef, {
  //       userId:currentUser.uid,
  //       name: "ashley",
  //       payment: "upi",
  //       timeLeft: "50 min",
  //       type: "Delivery",
  //       status: "Delivered",
  //       total: "$500",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //createOrder(); //rum this code for create demo order
  return (
    <>
      <div className="px-10 lg:flex md:flex hidden w-full justify-between items-center bg-white mb-4 py-3 border-b-2  shadow-lg">
          <h1 className="text-4xl font-poppins font-semibold text-[#8A8A8A] pl-8">
           Orders
          </h1>
          <div className="flex flex-row gap-4 justify-center items-center">
            <div className="text-[#7AC93B]">
              <NotificationsIcon
                fontSize="large"
              ></NotificationsIcon>
            </div>
            <Avatar alt="Radhakrishn" src="/static/images/avatar/3.jpg" />
            <p className="text-[#8A8A8A] text-xl">{currentUser.name}</p>
          </div>
        </div>
   
    <div className="h-full w-full px-4 bg-[#FAFAFA] font-poppins">
      <div className="flex flex-col w-full p-5 rounded-lg h-ful">
        <div className="flex justify-between flex-col text-gray-400 md:flex-row">
          <ul className="flex  justify-center">
            <div
              className={`nav-link decoration-2 underline-offset-4 cursor-pointer  ${
                basicActive === "tab1"
                  ? "active flex text-[#7AC93B] font-bold"
                  : "hover:text-[#7AC93B] font-bold"
              }`}
              id="v-pills-home-tab1"
              data-toggle="pill"
              href="#v-pills-home1"
              role="tab"
              aria-controls="v-pills-home1"
              aria-selected={basicActive === "tab1"}
              style={{ backgroundColor: "transparent" }}
              onClick={() => setBasicActive("tab1")}
            >
              <li
                className={`px-4 py-2 font-weight-bold small ${
                  basicActive === "tab1" ? "underline" : ""
                }`}
                onClick={handleAllClick}
              >
                All Orders
              </li>
            </div>

            <div
              className={`nav-link decoration-2 underline-offset-4 cursor-pointer  ${
                basicActive === "tab3"
                  ? "active flex text-[#7AC93B] font-bold"
                  : "hover:text-[#7AC93B] font-bold"
              }`}
              id="v-pills-messages-tab1"
              data-toggle="pill"
              href="#v-pills-messages1"
              role="tab"
              aria-controls="v-pills-messages1"
              aria-selected={basicActive === "tab3"}
              style={{ backgroundColor: "transparent" }}
              onClick={() => setBasicActive("tab3")}
            >
              <li
                className={`px-4 py-2 font-weight-bold small ${
                  basicActive === "tab3" ? "underline" : ""
                }`}
                onClick={handleCompletedClick}
              >
                Completed
              </li>
            </div>

            <div
              className={`nav-link decoration-2 underline-offset-4 cursor-pointer  ${
                basicActive === "tab4"
                  ? "active flex text-[#7AC93B] font-bold"
                  : "hover:text-[#7AC93B] font-bold"
              }`}
              id="v-pills-settings-tab1"
              data-toggle="pill"
              href="#v-pills-settings1"
              role="tab"
              aria-controls="v-pills-settings1"
              aria-selected={basicActive === "tab4"}
              style={{ backgroundColor: "transparent" }}
              onClick={() => setBasicActive("tab4")}
            >
              <li
                className={`px-4 py-2 font-weight-bold small ${
                  basicActive === "tab4" ? "underline" : ""
                }`}
                onClick={handleCancelledClick}
              >
                Cancelled
              </li>
            </div>
          </ul>

          <div className="flex justify-center mb-2 pr-3 text-black">
            <div className="border-2 border-gray-200 flex py-1 rounded-xl h-10 justify-center items-center px-2">
              <FaCalendarAlt className="mr-2 w-30"/>
              <p className="text-sm mt-1">
                <DatePicker date={startDate} setDate={setStartDate} />
              </p>
            </div>
            <p className="p-2">To</p>
            <div className="border-2 border-gray-200 flex py-1 rounded-xl h-10 justify-center items-center px-2">
              <FaCalendarAlt className="mr-2 w-30" />
              <p className="text-sm mt-1">
                <DatePicker date={endDate} setDate={setEndDate} />
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full overflow-y-clip font-semibold overflow-x-scroll">
          <div className="my-2 font-bold text-sm bg-white flex items-center p-2 border-2 justify-evenly border-gray-200 rounded-lg  w-[800px] md:w-full">
            <span className="flex justify-start items-center text-lg cursor-pointer text-[#7AC93B]">
              <p>Id</p>
              <ArrowDropDownIcon />
            </span>
            <span className="flex justify-start items-center text-lg cursor-pointer text-[#7AC93B]">
              Name
            </span>
            <span
              className="flex justify-start items-center text-lg cursor-pointer text-[#7AC93B]"
              onClick={() => {
                selectFilter(1);
              }}
            >
              <p>Time remaining</p>
            </span>
            <span className="flex justify-start items-center text-lg cursor-pointer text-[#7AC93B]">
              Type
            </span>
            <span className="flex justify-start items-center text-lg cursor-pointer text-[#7AC93B]">
              Status
            </span>
            <span
              className="flex justify-start items-center text-lg cursor-pointer text-[#7AC93B]"
              onClick={() => {
                selectFilter(2);
              }}
            >
              Total <ArrowDropDownIcon />
            </span>
            <span className="flex justify-start items-center text-lg cursor-pointer text-[#7AC93B]">
              Action
            </span>
            {userType === "seller" && <span></span>}
          </div>
          <div className="h-[100%] font-medium   w-[800px] md:w-full">
            {info.length === 0 && (
              <div className="text-center font-semibold text-xs justify-center flex items-center">
                NO ORDERS!
              </div>
            )}
            {info
              .sort((a, b) =>
                filter == 1
                  ? (
                      sorting
                        ? a.timeLeft < b.timeLeft
                        : a.timeLeft > b.timeLeft
                    )
                    ? 1
                    : -1
                  : sorting
                  ? a.total > b.total
                  : a.total < b.total
                  ? 1
                  : -1
              )
              .map((orderInfo, index) => (
                <OrderInfo
                  orderInfo={orderInfo}
                  key={index}
                  getOrders={() => {}}
                  index={index}
                />
              ))}
          </div>
        </div>
      </div>
    </div> </>
  );
}

const OrderInfo = ({ orderInfo, getOrders, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteOrder = async () => {
    try {
      const orderDoc = doc(db, "orders", orderInfo.id);
      await deleteDoc(orderDoc);
    } catch (err) {
      console.log(err);
    }
    getOrders();
  };

  return (
    <React.Fragment>
      <div className="text-base bg-white flex  p-2 justify-evenly border-gray-200 rounded-lg my-4 w-full items-center">
        <span className="flex flex-col justify-center items-center text-xs w-16 h-12">
          {`${orderInfo.id}`.slice(0, 5)}
        </span>
        <span className="flex flex-col justify-center items-center w-24 h-12">
          <span className="flex gap-x-1 items-center">
            {orderInfo.product?.name}
          </span>
        </span>
        <span className="flex flex-col justify-center items-center w-32 h-12">
          <span className="flex gap-x-2 items-center">
            <AccessTimeIcon fontSize="small" />
            <p>{new Date(orderInfo.eta.seconds).toLocaleDateString()}</p>
          </span>
        </span>
        <span className="flex flex-col justify-center items-center w-20 h-12">
          {orderInfo.product?.category}
        </span>
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`${
              orderInfo.status === "Delivered"
                ? "text-yellow-300 "
                : orderInfo.status === "Cancelled"
                ? "text-red-400"
                : "text-green-500"
            } flex items-center gap-[5px]`}
          >
            <p
              className={`rounded-full h-1 w-1 p-1 shadow-2xl shadow-yellow-400 bg-yellow-400 `}
            ></p>
            {DELIVERY_STATUS[orderInfo.status]}
          </button>
        </div>
        <span className="flex flex-col justify-center items-center w-12 h-12 ">
          {orderInfo.totalPrice}
        </span>

        {userType === "buyer" ? (
          <div className="flex flex-row items-center gap-2">
            <Link
              to={`/dashboard/tracking/${orderInfo.id}`}
              className="w-[70px] border border-gray-300  rounded-lg h-[38px] hover:bg-gray-300 flex justify-center items-center"
            >
              Track
            </Link>
          </div>
        ) : null}

        {userType === "seller" && (
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={isOpen === true && "rotate-180"}
          >
            <IoIosArrowDown />
          </button>
        )}
      </div>
      {userType === "seller" && isOpen === true && (
        <div className="px-[100px]">
          <StatusSelectMenu order={orderInfo} getOrders={getOrders} />
          <StatusSelectMenu order={orderInfo} getOrders={getOrders} />
        </div>
      )}
    </React.Fragment>
  );
};

const StatusSelectMenu = ({ order, getOrders }) => {
  const List = ["Loading", "Filling", "Dispatch"];
  const [statusValue, setStatusvalue] = useState(order.status);
  const handleStatus = (e) => {
    setStatusvalue(() => e.target.value);
  };

  const upddateStatus = async () => {
    const orderDoc = doc(db, "orders", order.id);
    const newStatus = { status: statusValue };
    try {
      await updateDoc(orderDoc, newStatus);
      getOrders();
    } catch (err) {
      console.lg(err);
    }
  };

  return (
    <React.Fragment>
      <div className="flex w-[400px] transition-all ease-out bg-white border border-gray-300 p-[8px] rounded-xl z-50 items-center gap-[5px] transform duration-700 backdrop-opacity-100">
        {List.map((item, index) => (
          <button
            key={index}
            onClick={handleStatus}
            value={item}
            className={`hover:bg-slate-300 focus:bg-slate-300 font-poppins font-medium text-[14px] leading-[28px] h-[36px] text-[#111B29] flex items-center justify-center rounded-lg w-full`}
          >
            {item}
          </button>
        ))}
        <button
          onClick={upddateStatus}
          className="bg-[#2945FF] h-[38px] text-white flex items-center justify-center rounded-lg w-full mx-[2px]"
        >
          Update
        </button>
      </div>
    </React.Fragment>
  );
};

export default Order;
