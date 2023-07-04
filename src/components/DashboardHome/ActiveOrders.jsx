import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";

function ActiveOrders() {
  const { orders: activeOrders } = useSelector((state) => state.orders);

  const style = {
    fontFamily: "Poppins, sans-serif",
  };

  return (
    <div
      className="rounded-3xl py-4 px-0.5 border-1 border-gray-300 h-30 w-50 cursor-pointer transition ease-out duration-[400ms] hover:scale-105"
      style={style}
    >
      <div className="flex flex-row justify-between px-3 ">
        <h1 className="font-black text-sm ml-6">Orders</h1>
        <p className="text-[#558D29] text-xs font-extrabold hover:cursor-pointer">
          View all
          <ArrowRightAltIcon style={{ width: "1rem" }} />
        </p>
      </div>
      <div className="pt-2 pb-4  text-xs text-gray-500 font-bold flex flex-row items-center justify-center ">
        <div className="w-20 ">ID</div>
        <p className="w-44">Product</p>
        <p className="w-28">ETA</p>
        <p className="w-20">Price</p>
        <p className="w-20 pl-2">Receipt</p>
      </div>
      <div className="h-[160px]">
        {activeOrders.length ? (
          activeOrders
            .sort((a, b) =>
              a.createdAt.seconds > b.createdAt.seconds ? 1 : -1
            )
            .slice(0, 3)
            .map((order, index) => {
              return (
                <>
                  <div className="py-1 text-xs text-black font-semibold flex flex-row items-center justify-center transition ease-out duration-[300ms] hover:scale-[1.03]">
                    <div className="w-20">{`${order.id}`.substring(0, 6)}</div>
                    <p className="w-44 font-bold">{"name"}</p>
                    <p className="w-28 font-bold">
                      {`${
                        new Date(order.createdAt.seconds)
                          .toISOString()
                          .split("T")[0]
                      }`}
                    </p>
                    <p className="w-20 font-bold">${order.totalPrice}</p>
                    <div className="pl-5 w-20 text-blue-600 hover:cursor-pointer">
                      <StickyNote2Icon />
                    </div>
                  </div>
                  <div className="pr-20 pl-12">
                    <hr className="h-px my-2 bg-gray-300 border-0"></hr>
                  </div>
                </>
              );
            })
        ) : (
          <div className="text-gray-500 text-center">No orders found</div>
        )}
      </div>
    </div>
  );
}

export default ActiveOrders;
