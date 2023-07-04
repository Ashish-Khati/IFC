import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
function Ad({ offer }) {
  const style = {
    fontFamily: "Poppins, sans-serif",
  };
  return (
    <div className="h-full relative  cursor-pointer transform transition ease-out duration-[400ms] hover:scale-[1.08]">
      <div className="flex flex-col items-center h-full justify-center rounded-3xl py-2 px-5 bg-[#558D29]">
        <img
          src="./Images/add_avatar.svg"
          alt="img"
          className="rounded-2xl h-24 w-[70%] select-none"
        />
        <div className="text-white mt-4">
          <h1 className="text-base font-semibold mt-2 flex justify-center">
            Premium Offer
          </h1>
          <p className="text-xs mt-2">{offer}</p>
        </div>
      </div>
    </div>
  );
}
export default Ad;
