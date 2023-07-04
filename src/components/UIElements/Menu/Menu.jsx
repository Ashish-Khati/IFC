import { useState } from "react";
import classes from "./Menu.module.css";
import { useDispatch } from "react-redux";
import { openFeedbackModal } from "../../../redux/store/modalSlice";

export default function Menu({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function handleFeedbackClick() {
    dispatch(openFeedbackModal());
  }

  return (
    <div className="flex flex-col relative">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`font-inter font-semibold text-[15px] tracking-[-0.03em] h-[41px] hover:border-b-2 border-[#4A7B24] ${
          isOpen ? "border-b-2" : ""
        }`}
      >
        {item.name}
      </button>
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className={`${classes.dropDownProfile} absolute w-[300px] top-[50px] left-[-110px] bg-white border border-gray-500 px-[8px] py-[10px] rounded-xl `}
        >
          <span className="font-sg text-sm text-[#97A3B7] ml-[8px]">
            {item.name.toUpperCase()}
          </span>
          {item.list.map(({ title, onClick, commingSoon }, index) => (
            <button
              onClick={onClick}
              key={index}
              className={`${
                commingSoon ? "cursor-not-allowed" : ""
              } font-sg text-[14px] leading-[28px] h-[41px] p-[8px] text-[#111B29]  flex items-center justify-between hover:bg-[#e1e1e6] rounded-lg w-full`}
            >
              {title}
              {commingSoon && (
                <span className="text-[#4A7B24] font-bold">Comming Soon!</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
