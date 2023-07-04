// showing the all chats of the linked users
import React, { useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const ref = useRef();
  const user = useSelector((state) => state.auth.user);

  const renderText = (
    <>
      {message.sendBy === user.id && (
        <div className="flex flex-col items-end justify-end">
          <div
            className="py-3 px-4 rounded-2xl w-fit text-white mr-2"
            style={{ background: "#4A7B24" }}
          >
            <p className="text-lg">{message.text}</p>
          </div>
          <div className="text-xs  flex justify-end top-8 gap-1 mt-1 text-white">
            <span>
              <div
                style={{ background: "#4A7B24" }}
                className="w-3 h-3 rounded-full"
              ></div>
            </span>
          </div>
        </div>
      )}

      {message.sendBy !== user.id && (
        <span>
          <div
            className="py-3 px-4 rounded-2xl w-fit ml-2 text-black"
            style={{ background: "#E7E7E7" }}
          >
            <p className="text-lg">{message.text}</p>
          </div>
          <div className="text-xs  flex justify-start top-8 gap-1 mt-1 text-black-500">
            <span>
              <div
                style={{ background: "#E7E7E7" }}
                className="w-3 h-3 rounded-full"
              ></div>
            </span>
          </div>
        </span>
      )}
    </>
  );

  const renderImage = (
    <>
      {message.senderId === user.uid && (
        <div className="flex flex-col items-end justify-end">
          <div
            className="py-3 px-4 rounded-2xl w-fit text-white mr-2"
            style={{ background: "#4A7B24" }}
          >
            <img src={message.image} alt="img" />
          </div>
          <div className="text-xs  flex justify-end top-8 gap-1 mt-1 text-gray-500">
            <span>
              <div
                style={{ background: "#4A7B24" }}
                className="w-3 h-3 rounded-full"
              ></div>
            </span>
          </div>
        </div>
      )}

      {message.senderId !== user.uid && (
        <span>
          <div
            className="py-3 px-4 rounded-2xl w-fit ml-2 text-black"
            style={{ background: "#E7E7E7" }}
          >
            <img src={message.image} alt="img" />
          </div>
          <div className="text-xs  flex justify-start top-8 gap-1 mt-1 text-gray-500">
            <span>
              <div
                style={{ background: "#E7E7E7" }}
                className="w-3 h-3 rounded-full"
              ></div>
            </span>
          </div>
        </span>
      )}
    </>
  );

  return (
    <div ref={ref} className=" flex flex-col gap-4 mx-6 mt-4">
      {message.image ? renderImage : renderText}
    </div>
  );
};

export default Message;
