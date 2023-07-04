import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../redux/store/ordersRedux";
import { fetchUserChats } from "../redux/store/chatsSlice";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders()).unwrap();
    dispatch(fetchUserChats()).unwrap();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex lg:flex-row md:flex-row flex-col h-screen overflow-hidden">
        <Sidebar />
        <div className="h-full w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
