import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import BoltIcon from "@mui/icons-material/Bolt";

function Performance({ responseRate, deliveryOnTime, orderCompletion }) {
  const style = {
    fontFamily: "Poppins, sans-serif",
  };
  return (
    <div className="flex justify-between" style={style}>
      <div className="rounded-3xl border-1 border-gray-300 p-6 cursor-pointer transform transition ease-out duration-[400ms] hover:scale-[1.08]">
        <div className="flex gap-x-2 pb-5">
          <div className="w-5 h-5 bg-orange-400 rounded-md">
            <p className="tracking-tighter text-sm font-semibold rotate-40 pb-2 pr-8">
              ...
            </p>
          </div>
          <h1 className="text-black lg:text-sm text-xs font-bold ">
            Response rate
          </h1>
        </div>
        <div
          style={{ width: 120, height: 120 }}
          className="mx-auto font-semibold"
        >
          <CircularProgressbar
            value={responseRate}
            text={`${responseRate}%`}
            strokeWidth={12}
            styles={buildStyles({
              pathColor: "#9ED5C5",
              textColor: "black",
              textSize: "1rem",
              trailColor: "#ccffe6",
            })}
          />
        </div>
      </div>
      <div className="rounded-3xl border-1 border-gray-300 p-6 cursor-pointer transform transition ease-out duration-[400ms] hover:scale-[1.08]">
        <div className="flex gap-x-2 pb-5">
          <div className="w-5 h-5 bg-blue-600 rounded-md">
            <div className="relative left-1 bottom-1.5">
              <WatchLaterIcon style={{ fontSize: "8px", color: "BFACE2" }} />
            </div>
          </div>
          <h1 className="text-black lg:text-sm text-xs font-bold">
            Delivery on time
          </h1>
        </div>
        <div
          style={{ width: 120, height: 120 }}
          className="mx-auto font-semibold"
        >
          <CircularProgressbar
            value={deliveryOnTime}
            text={`${deliveryOnTime}%`}
            strokeWidth={12}
            styles={buildStyles({
              pathColor: "#F16767",
              textColor: "black",
              textSize: "1rem",
              trailColor: "#ccffe6",
            })}
          />
        </div>
      </div>
      <div className="rounded-3xl border-1 border-gray-300 p-6 cursor-pointer transform transition ease-out duration-[400ms] hover:scale-[1.08]">
        <div className="flex gap-x-2 pb-5">
          <div className="w-5 h-5 bg-cyan-300 rounded-md">
            <div className="relative left-1 bottom-1.5">
              <BoltIcon style={{ fontSize: "8px", color: "white" }} />
            </div>
          </div>
          <h1 className="text-black lg:text-sm text-xs font-bold">
            Order Completion
          </h1>
        </div>
        <div
          style={{ width: 120, height: 120 }}
          className="mx-auto font-semibold"
        >
          <CircularProgressbar
            value={orderCompletion}
            text={`${orderCompletion}%`}
            strokeWidth={12}
            styles={buildStyles({
              pathColor: "#9ED5C5",
              textColor: "black",
              textSize: "1rem",
              trailColor: "#ccffe6",
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default Performance;
