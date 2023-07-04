import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./DeliveryCard.module.css";
import { Avatar, IconButton } from "@mui/material";
import { Call, Message } from "@mui/icons-material";

export default function DeliveryCard({ order, active }) {
  return (
    <Link
      className={`${styles.ordercontent} ${
        active ? "border-[#5932EA]" : ""
      } bg-white rounded-xl border-2`}
      to={`/dashboard/tracking/${order?.id}`}
    >
      <div className={styles.OCgroup1}>
        <div className="flex flex-col gap-[5px]">
          <h1 className={styles.OCG1heading}>Shipment ID</h1>
          <h1 className={styles.OCG1shipmentNo}>
            {`${order.id}`.slice(0, 10)}
          </h1>
          <h1 className={styles.OCG1fuelType}>{order.product?.name}</h1>
        </div>
        <img src="/Images/truckImage.png" alt="img" />
      </div>
      <hr className={styles.hline}></hr>
      <div className={styles.OCgroup2}>
        <div className={styles.startingDesitination}>
          <div className={styles.startImg}>
            <img src="/Images/startLocation.png" alt="img"></img>
          </div>
          <div className={styles.address}>
            <h1 className={styles.mainaddress}>{order?.origin?.addressLine}</h1>
            <h3 className={styles.secondaryaddress}>{order?.origin?.city}</h3>
          </div>
        </div>
        <div className={`${styles.startingDesitination} ${styles.endlocation}`}>
          <div className={styles.startImg}>
            <img src="/Images/endLocation.png" alt="img"></img>
          </div>
          <div className={styles.address}>
            <h1 className={styles.mainaddress}>
              {order?.destination?.addressLine}
            </h1>
            <h3 className={styles.secondaryaddress}>
              {order?.destination?.city}
            </h3>
          </div>
        </div>
      </div>
      <hr className={styles.hline}></hr>
      <div className={styles.OCgroup3}>
        <div className={styles.clientprofile}>
          {order.seller?.profileURL ? (
            <Avatar alt={order.seller?.name} src={order.seller?.profileURL} />
          ) : (
            <Avatar>{`${order.seller?.name}`.charAt(0)}</Avatar>
          )}
        </div>
        <div className={styles.clientinfo}>
          <h3>Seller</h3>
          <h1 className={styles.clientname}>{order.seller?.name}</h1>
          <h2 className={styles.company}>LTD</h2>
        </div>
        <div className={styles.clientcalltext}>
          {/* <IconButton>
            <Call sx={{ color: "#5932EA" }} />
          </IconButton> */}
          <IconButton>
            <Message sx={{ color: "#5932EA" }} />
          </IconButton>
        </div>
      </div>
    </Link>
  );
}
