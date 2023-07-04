import React, { useState } from "react";
import style from "./Tracking.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";
import DeliveryCard from "../../components/DeliveryCard/DeliveryCard";
import SearchBar from "../../components/UIElements/SearchBar";
import TrackingMap from "../../components/TrackingMap";
import { getDirection } from "../../utils/map";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Avatar} from "@mui/material";
const SEARCH_ON_KEYS = [["product", "name"]]; // productName key will be used to search

export default function Tracking() {
  const currentUser = useSelector((state) => state.auth.user);
  const { orders } = useSelector((s) => s.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderRoute, setSelectedOrderRoute] = useState(null);
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (orders.length === 0) return;
    const order = orders.find(({ id }) => orderId && id === orderId);
    const activeProduct = order || orders[0];
    setSelectedOrder(activeProduct);
    navigate(`${activeProduct.id}`);
  }, [orders, orderId]);

  // useEffect(() => {
  //   if (!isLoaded || !selectedOrder) return;
  //   const { origin, destination } = selectedOrder;
  //   getDirection({
  //     origin: `${origin.lat},${origin.lng}`,
  //     destination: `${destination.lat},${destination.lng}`,
  //   }).then((res) => {
  //     setSelectedOrderRoute(res);
  //   });
  // }, [isLoaded, selectedOrder]);

  const SearchHandler = (orderId) => {
    navigate(`/dashboard/tracking/${orderId}`);
  };

  return (
    <>
      <div className="px-10 lg:flex md:flex hidden w-full justify-between items-center bg-white mb-4 py-3 border-b-2  shadow-lg">
          <h1 className="text-4xl font-poppins font-semibold text-[#8A8A8A] pl-8">
            Tracking
          </h1>
          <div className="flex flex-row gap-4 justify-center items-center">
            <div className="text-[#7AC93B]">
              <NotificationsIcon
                fontSize="large"
              ></NotificationsIcon>
            </div>
            <Avatar alt="Radhakrishn" src="/static/images/avatar/3.jpg" />
            <p className="text-[#8A8A8A] text-xl">{currentUser.name}</p>
          </div>
        </div>
    <div className={`${style.trackingwrapper}`}>
      <div className={`${style.orderdata} p-6`}>
        <SearchBar
          items={orders}
          keys={SEARCH_ON_KEYS}
          searchHandler={SearchHandler}
        />
        <h1 className={`${style.orderheading} text-2xl mt-6`}>
          Ongoing Deliveries
        </h1>
        <div className="mt-4">
          {orders?.map((order) => (
            <DeliveryCard
              key={order.id}
              order={order}
              active={selectedOrder && selectedOrder.id === order.id}
            />
          ))}
          {orders.length === 0 && <span>No Orders!</span>}
        </div>
      </div>
      <div className={style.mapfortracking}>
        {/* {isLoaded && (
          <TrackingMap
            route={selectedOrderRoute}
            origin={selectedOrder.origin}
            destination={selectedOrder.destination}
          />
        )} */}
      </div>
    </div>
    </>
  );
}
