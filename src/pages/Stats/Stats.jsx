import React from "react";
import Wallet from "../../components/DashboardHome/Wallet";
import ActiveOrders from "../../components/DashboardHome/ActiveOrders";
import Inbox from "../../components/DashboardHome/Inbox";
import ActiveAds from "../../components/DashboardHome/ActiveAds";
import Ad from "../../components/DashboardHome/Ad";
import { useSelector } from "react-redux";
import TransactionsCard from "../../components/TransactionsCard";
import { Grid } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Avatar} from "@mui/material";
const offer = "Get 10% off on your first order";

function DashboardHome() {
  const currentUser = useSelector((state) => state.auth.user);

  if (true) {
    return (<>
        <Grid item xs={12} sm={12} md={12}>
        <div className="px-10 lg:flex md:flex hidden w-full justify-between items-center bg-white mb-4 py-3 border-b-2  shadow-lg">
          <h1 className="text-4xl font-poppins font-semibold text-[#8A8A8A] pl-8">
            Home
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
        </Grid>
      <Grid 
      justifyContent="center"
      container spacing={4} p={{xs:3,sm:8,md:8}}>
        <Grid item xs={12} sm={12} md={8}>
          <div>NAme : TYpe : ID: Address : Veriied</div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Wallet />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Inbox />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <ActiveOrders />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          {currentUser.userType === 1 ? <ActiveAds /> : <TransactionsCard />}
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Ad offer={offer} />
        </Grid>
      </Grid></>
    );
  }
}

export default DashboardHome;
