import React, { useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChatIcon from "@mui/icons-material/Chat";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Face } from "@mui/icons-material";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where, or } from "firebase/firestore";
import { USER_TYPES } from "../../constants/user";

function Inbox() {
  const style = {
    fontFamily: "Poppins, sans-serif",
  };
  const { chats } = useSelector((state) => state.chats);

  return (
    <div
      className="h-full rounded-3xl border-1 divide-y-1 border-gray-300 cursor-pointer transform transition ease-out duration-[400ms] hover:scale-105"
      style={style}
    >
      <div className="px-4 pt-4 pb-2 flex flex-row justify-between">
        <h1 className="font-bold text-sm">Inbox</h1>
        <p className="text-[#558D29] text-xs font-bold hover:cursor-pointer">
          View all
          <ArrowRightAltIcon style={{ width: "1rem" }} />
        </p>
      </div>
      <div className="overflow-hidden divide-y-1 border-gray-300 pb-2">
        {chats.slice(0, 4).map((chat) => {
          const date = new Date(
            chat.recentMessage.sendAt?.seconds
          ).toLocaleDateString();
          return (
            <div className="px-4 py-2 flex flex-row justify-between transition ease-out duration-[300ms] hover:scale-105">
              <div className="flex flex-row items-center gap-2">
                <Face />
                <div className="font-bold">
                  <h1 className="text-sm">saif</h1>
                  <h1 className="text-xs">{chat.recentMessage.text}...</h1>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                {date}
                <StarBorderIcon style={{ width: "13", height: "13" }} />
              </p>
            </div>
          );
        })}
        {chats.length === 0 && (
          <div className="text-center text-gray-500 ">No chats</div>
        )}
      </div>
    </div>
  );
}
export default Inbox;
