import React, { useEffect, useState } from "react";
import { MdWaterDrop } from "react-icons/md";

const initialPrice = [
  {
    type: "Petrol",
    price: "Loading...",
    trend: "Up From Yesterday",
  },
  {
    type: "Petrol",
    price: "Loading...",
    trend: "Up From Yesterday",
  },
];

export default function PriceCard({ fuelsPrice }) {
  const [prices, setPrices] = useState(initialPrice);

  useEffect(() => {
    if (!fuelsPrice) return;
    const prices = Object.entries(fuelsPrice).map(([type, price]) => {
      return { type, price, trend: "" };
    });
    setPrices(prices);
  }, [fuelsPrice]);

  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  return (
    <section className="lg:px-16 md:px-16 px-5">
      <div className="font-roboto font-bold lg:text-[24px] md:text-[24px] text-[21px] lg:leading-[35px] md:leading-[35px] leading-[25px]">
        Live Fuel Prices
      </div>
      <div className="flex justify-center gap-5 text-white mt-4">
        {(width < 840 ? prices.slice(0, 2) : prices).map(
          ({ type, price, trend }) => {
            return (
              <div className="border-solid hover:shadow-lg w-full hover:scale-105 transition-all duration-300 md:w-1/5 bg-[#294B0E] text-white tex p-2.5 rounded-lg overflow-hidden border-opacity-50 flex flex-col justify-center">
                <div>
                  <div className="flex items-center gap-2 text-md">
                    {/* <WaterDropIcon></WaterDropIcon> */}
                    <MdWaterDrop className="text-[#7AC93B] text-xl"></MdWaterDrop>
                    <p
                      className="text-md"
                      style={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {type}
                    </p>
                  </div>
                  <div className="flex lg:text-2xl md:text-2xl text-xl items-center my-1">
                    <p style={{ fontWeight: "bold" }}>{`₹ ${price}`}</p>
                  </div>
                  <div className="flex gap-2 items-center text-sm">
                    <img className="w-4" src="../Images/down.png" alt={trend} />
                    <p style={{ color: "red" }}>22%</p>
                    <p>{`${trend}`}</p>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}
