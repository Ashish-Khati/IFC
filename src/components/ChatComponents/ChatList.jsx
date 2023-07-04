import { DoneAll, AccountCircle, Done } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/api";
import { db } from "../../firebase";
import { doc, getDoc } from "@firebase/firestore";
import { getRecentMessage } from "../../api/chat";
import { useNavigate } from "react-router-dom";
import { formatDistance } from "date-fns";

export default function ChatList({ chats, onSelect, selectedChatId }) {
  if (!chats) {
    return (
      <div className="grid h-4/5 place-content-center text-xl font-semibold">
        no chats yet!
      </div>
    );
  }

  return (
    <div>
      {chats.map((chat) => (
        <ChatCard
          key={chat.id}
          onSelect={onSelect}
          chat={chat}
          selectedChatId={selectedChatId}
        />
      ))}
    </div>
  );
}

function ChatCard({ chat, onSelect, selectedChatId,setShowList}) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <div
      onClick={() => {
        onSelect(chat.id);
        navigate(chat.id);
        setShowList(false);
      }}
      className={`${
        selectedChatId === chat.id ? "bg-blue-300" : "bg-white"
      } flex mt-2 border-b-2 justify-between cursor-pointer hover:bg-gray-200 p-2 rounded-lg overflow-hidden`}
    >
      <div className="flex gap-4 items-center">
        <AccountCircle fontSize="large" sx={{ color: "black" }} />
        <div>
          <div className="font-semibold" style={{ fontSize: "1.1rem" }}>
            {
              chat[chat?.seller?.id === currentUser.id ? "buyer" : "seller"]
                ?.fullName
            }
          </div>
          <p
            style={{ fontSize: "0.9rem" }}
            className="overflow-hidden truncate w-[full] h-5"
          >
            {chat?.recentMessage?.text}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-end items-end gap-2 pl-1">
        {formatDistance(
          new Date(Number(chat.recentMessage?.sendAt?.seconds) * 1000),
          new Date()
        )}
        {" ago"}
      </div>
    </div>
  );
}
