import { useState } from "react";
import format from "date-fns/format";
import { Calendar } from "react-date-range";

export default function DatePicker({ date, setDate }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <input
        value={format(date, "dd/MM/yyyy")}
        readOnly
        required
        onClick={() => setIsOpen((prev) => !prev)}
        className="font-sans cursor-pointer text-sm text-[#A9A9A9] pt-[11px] pb-[12px] w-full h-[42px] border border-[#D1D1D1] bg-[#F9F9F9] rounded-xl px-[20px] outline-none flex justify-start"
        placeholder="22/01/2023"
      />
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className=""
        >
          <Calendar
            date={date}
            onChange={(d) => {
              setDate(d);
              setIsOpen(false);
            }}
            className="absolute mt-[10px]  border-2 border-gray-200 rounded-xl "
          />
        </div>
      )}
    </>
  );
}
