import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import DropzoneComponent from "../../components/SupportDropzone/Dropzone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

const Arrow = styled(ArrowForwardIcon)`
  font-size: 12px;
`;

const Support = () => {
  const currentUser = useSelector((state) => state.auth.user);

  const [raisedTickets, setRaisedTickets] = useState(13);
  const [ongoingTickets, setOngoingTickets] = useState(4);
  const [ticketsResolved, setTicketsResolved] = useState(9);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRaisedTickets((prevTickets) => prevTickets + 1);
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
  };

  return (
    <div className="w-full  overflow-hidden overflow-y-scroll scrollbar h-screen bg-[#F8FAFB]">
      <div className="flex justify-between items-center h-[10%] bg-[#FFFFFF] px-[54px] py-4 flex-wrap border-b-2 drop-shadow-md">
        <div className="flex  flex-wrap justify-start items-center gap-5">
          <p className="font-bold font-poppins text-2xl  text-[#8A8A8A] sm:pb-0">
            Support
          </p>
        </div>
        <div className="flex flex-row gap-4 relative right-6">
          <NotificationsIcon
            className="text-[#7AC93B]"
            fontSize="large"
          ></NotificationsIcon>
          <div className="flex gap-1">
            <Avatar
              alt="Radhakrishn"
              src="/static/images/avatar/3.jpg"
              className="h"
            />
            <p className="text-[#8A8A8A] text-xs flex items-center">
              {currentUser.fullName}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center flex-col">
        <div className="flex justify-center gap-8">
          <div className="p-5  bg-[#F2FAEB]  border-[#7AC93B] border rounded-xl flex items-center flex-col gap-3 px-10">
            <h2 className="mt-[10px] font-poppins font-medium">
              Tickets Raised
            </h2>
            <p className="text-4xl font-extrabold font-roboto">
              {raisedTickets}
            </p>

            <span className="text-lime-700 text-[12px] cursor-pointer items-center flex">
              Show all <Arrow />
            </span>
          </div>{" "}
          <div className="p-5 font-poppins  bg-[#F2FAEB]  border-[#7AC93B] border rounded-xl flex items-center flex-col gap-3 px-10">
            <h2 className="mt-[10px] font-medium">Ongoing Tickets</h2>
            <p className="text-4xl font-extrabold font-roboto">
              {ongoingTickets}
            </p>

            <span className="text-lime-700 text-[12px] cursor-pointer items-center flex">
              Show all <Arrow />
            </span>
          </div>{" "}
          <div className="p-5 font-poppins bg-[#F2FAEB]  border-[#7AC93B] border rounded-xl flex items-center flex-col gap-3 px-10">
            <h2 className="mt-[10px] font-medium">Tickets Resolved</h2>
            <p className="text-4xl font-extrabold font-roboto">
              {ticketsResolved}
            </p>

            <span className="text-lime-700 text-[12px] cursor-pointer items-center flex">
              Show all <Arrow />
            </span>
          </div>{" "}
        </div>
        {/* <div className="flex justify-center  mt-10 w-[60%] "> */}
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col my-5 mt-8 py-4 px-6 bg-[#F2FAEB]  border-[#7AC93B] border rounded-xl gap-4"
        >
          <h1 className="text-2xl font-poppins font-extrabold text-[#828282]">
            Raise a ticket
          </h1>
          <div className="flex gap-8 ">
            <div className=" flex flex-col gap-2">
              <label
                for="ticketTitle"
                className="text-sm font-poppins font-semibold"
              >
                Ticket Title
              </label>
              <input
                type="text"
                placeholder="Enter ticket title"
                required
                name="ticketTitle"
                className="bg-transparent text-[14px] text-[#768396] border-[#E5E5ED] border rounded-[5px] p-3 w-[300px] focus: outline-none"
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label
                for="dog-names"
                className="text-sm font-poppins font-semibold"
              >
                Category
              </label>
              <select
                required
                name="dog-names"
                id="dog-names"
                type="text"
                placeholder="Enter ticket title"
                className="bg-transparent text-[14px] text-[#768396] border-[#E5E5ED] border rounded-[5px] p-3 w-[300px] focus: outline-none "
              >
                <option value="" disabled selected>
                  Choose Category
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
          <div className="flex gap-9 items-end">
            <div>
              <textarea
                required
                name=""
                id=""
                cols="10"
                rows="10"
                placeholder="Enter description of issue"
                className="bg-transparent text-[14px] text-[#768396] border-[#E5E5ED] border rounded-[5px] p-3 w-[300px] h-[80px] focus: outline-none"
              ></textarea>
            </div>
            <div className=" flex flex-col gap-2 relative bottom-1">
              <label
                for="ticketTitle"
                className="text-sm font-poppins font-semibold"
              >
                Upload Attachement
              </label>
              <div className="flex gap-2">
                <UploadFileRoundedIcon
                  className="text-lime-600 "
                  style={{ fontSize: "30px" }}
                />
                <DropzoneComponent />
              </div>
            </div>
          </div>
          <button className="border rounded-[10px] bg-[#7AC93B] text-white py-1.5 px-8">
            Submit
          </button>
        </form>

        <p className="mt-[10px] font-semibold text-[#768396] text-[16px]">
          Got a question? Search through our{" "}
          <span className="text-lime-600">
            <u>FAQ.</u>
          </span>
        </p>

        <div className="h-[0px] w-[60%] border border-[#E5E5ED] mt-5"></div>

        <h1 className="text-lime-700 font-poppins font-medium text-lg">
          Contact us at
        </h1>

        <div className="flex gap-10 justify-center items-center mt-2 mb-5 text-[#768396] text-[12px]">
          <div>
            <LocalPhoneOutlinedIcon />
            212345654545 (Toll Free)
          </div>
          <div>
            <EmailOutlinedIcon />
            fuelcab@email.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
