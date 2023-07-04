import React, { useState } from "react";

export default function QuantityMenu({ unit, setUnit, units }) {
  const [isOpen, setIsOpen] = useState(false);
  const List = units || ["Pack", "Kg", "Box"];

  return (
    <div className="w-full h-full">
      <input
        value={unit}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
        className="pl-2 h-full font-sans cursor-pointer capitalize text-sm text-[#A9A9A9] w-full h-[42px] bg-[#F9F9F9] rounded-xl outline-none"
        placeholder="Packs"
      />
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute w-[200px] cursor-pointer mt-[10px]  bg-white border-2 border-gray-200  ml-[-60px]  px-[8px] py-[10px] rounded-xl "
        >
          {List.map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                setUnit(e.target.value);
                setIsOpen(false);
              }}
              value={item}
              className="capitalize font-poppins text-[14px] leading-[28px] h-[38px] p-[8px] text-[#151515] flex items-center justify-start hover:bg-[#e1e1e6] rounded-lg w-full"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
