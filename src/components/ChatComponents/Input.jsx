import React, { useState } from "react";
import {
  AttachFile,
  CameraAltOutlined,
  CloseRounded,
  EmojiEmotionsOutlined,
  MicOutlined,
  SendOutlined,
} from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";

function Input({ onSend }) {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // for send the new message
  const handleSend = async () => {
    if (img) onSend(img);
    if (text) onSend(text);
    setText("");
    setImg(null);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  const handleFileInput = (e) => {
    setImg(e.target.files[0]);
  };

  const handleEmojiSelect = (emojiObject, e) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="flex justify-between gap-3 relative">
      {img && (
        <span className="rounded-xl absolute bottom-[100%] left-0 bg-slate-100 p-1 m-2">
          <img
            className="h-32 rounded-xl aspect-square object-cover"
            src={URL.createObjectURL(img)}
            alt="img"
          />
          <i
            onClick={() => {
              setImg(null);
            }}
          >
            <CloseRounded className="absolute top-[-12px] right-[-12px] bg-slate-100 rounded-xl" />
          </i>
        </span>
      )}
      <div className="flex gap-4 w-full justify-between items-center bg-slate-100 p-3 rounded-xl">
        <div className="flex gap-4 w-full items-center">
          <span
            onClick={() => {
              document.getElementById("file").click();
            }}
          >
            <AttachFile />
            <input
              className="hidden"
              type="file"
              name="file"
              id="file"
              multiple="false"
              accept="image/*"
              value={img ? img.filename : ""}
              onInput={handleFileInput}
            />
          </span>
          <input
            className="bg-transparent w-full p-1 outline-none text-black"
            type="text"
            placeholder="Enter Everything In Your Mind"
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={handleKey}
          />
        </div>
        <div className="flex gap-4">
          {showEmojiPicker && (
            <span className="rounded-xl absolute bottom-[102%] right-0 bg-slate-100 p-1 m-2">
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </span>
          )}
          <i
            onClick={() => {
              setShowEmojiPicker((prev) => !prev);
            }}
          >
            <EmojiEmotionsOutlined />
          </i>
        </div>
      </div>
      <div className="flex gap-4">
        {
          <span
            className="grid place-content-center w-14 p-3 rounded-xl h-full bg-[#7AC93B]"
            onClick={handleSend}
          >
            <SendOutlined style={{ color: "white" }} />
          </span>
        }
        {/* {!text && (
          <i className="grid place-content-center w-14 p-3 rounded-xl h-full bg-blue-500">
            <MicOutlined style={{ color: "white" }} />
          </i>
        )} */}
      </div>
    </div>
  );
}

export default Input;
