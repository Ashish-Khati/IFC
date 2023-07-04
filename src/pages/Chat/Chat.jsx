import React from "react";
import Search from "../../components/ChatComponents/Search";
import Chats from "../../components/ChatComponents/ChatList";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ChatRoom from "../../components/ChatComponents/ChatRoom";
import ChatList from "../../components/ChatComponents/ChatList";
import { useParams } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Avatar} from "@mui/material";

export default function ChatPage() {
  const currentUser = useSelector((state) => state.auth.user);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showList, setShowList] = useState(false);
  const { chats } = useSelector((state) => state.chats);
  const { id: chatId } = useParams();

  useEffect(() => {
    if (chats.length === 0 || !chatId) return;
    const chat = chats.find(({ id }) => chatId && id === chatId);
    setSelectedChatId(chat.id);
  }, [chats, chatId]);

  return (
    <>
    <div className="px-10 lg:flex md:flex hidden w-full justify-between items-center bg-white mb-4 py-3 border-b-2  shadow-lg">
        <h1 className="text-4xl font-poppins font-semibold text-[#8A8A8A] pl-8">
          Chat
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
    <div className="flex w-full h-full lg:justify-start md:justify-start border justify-center">
          
      <div
        className={`p-4 lg:w-[40%] lg:max-w-[400px] h-full lg:flex ${
          showList ? `flex md:w-1/2 w-full` : `hidden`
        } flex-col`}
      >
        <Search tempChats={[]} />
        <h1 className="text-2xl font-bold mt-6">People</h1>
        <div className="h-full p-2 rounded-lg shadow-2xl">
          <ChatList
            chats={chats}
            onSelect={setSelectedChatId}
            selectedChatId={selectedChatId}
            setShowList={setShowList}
          />
        </div>
      </div>
      <div
        className={`lg:flex ${
          showList ? `hidden` : `flex`
        } flex-col w-full bg-white border-2 p-5`}
      >
        <ChatRoom chatId={selectedChatId} setShowList={setShowList} />
      </div>
    </div></>
  );
}
