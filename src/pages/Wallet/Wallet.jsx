import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { orderBy, query } from "firebase/firestore";
import { where } from "firebase/firestore";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import PayAdd from "./PayAdd";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/UIElements/Button";
import { getTransactions } from "../../api/wallet";
import { useDispatch } from "react-redux";
import { PAYMENT_MODES } from "../../constants/transaction";
import TransactionTable from "../../components/TransactionTable";
import { USER_TYPES } from "../../constants/user";
import { Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Wallet() {
  const {
    wallet: { totalDiscount, amountSpent, transactions },
    auth: { user },
  } = useSelector((s) => s);
  const [transactionType, setTransactionType] = useState(0);
  const [openAddMoneyModal, setOpenAddMoneyModal] = useState(false);
  const [dateFilterValue, setDateFilterValue] = useState("all");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(
      getTransactions({ userId: user.id, userType: USER_TYPES[user.userType] })
    );
  }, []);

  return (
    <div className="h-full bg-[#FAFAFA] w-full overflow-x-hidden">
      <div className="flex flex-col justify-center w-full flex-wrap">
      <div className="px-10 lg:flex md:flex hidden w-full justify-between items-center bg-white mb-4 py-3 border-b-2  shadow-md">
          <h1 className="text-4xl font-poppins font-semibold text-[#8A8A8A] pl-8">
            Wallet
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
        <div className="flex flex-col w-[95%] ml-auto mt-5 mr-auto shadow-lg">
          <div className="w-full flex justify-center pr-10 lg:justify-end">
            <Button
              size="large"
              startIcon={<FaPlus />}
              onClick={() => setOpenAddMoneyModal(true)}
              color="success"
            >
              ADD MONEY
            </Button>
          </div>
          <section className="flex justify-center 2xl:justify-between items-center flex-wrap gap-[22px] m-4 px-6">
            <div
              className="gap-2 flex flex-col pl-[45px] py-[51px]  "
              style={{
                width: "348.82px",
                height: "192px",
                backgroundColor: "#DDF6F8",
                boxShadow: " 0px 2.87095px 44.4997px rgba(39, 52, 125, 0.05)",
                borderRadius: "11.4838px",
              }}
            >
              <div>
                <p className="text-xl leading-[35px] font-poppins text-[#464255]">
                  Wallet Balance
                </p>
                <h2 className="text-[44px] text-[#464255] font-medium leading-[68px] font-mitr">
                  {user?.walletAmount}
                </h2>
              </div>
            </div>
            <div
              className="gap-2 flex flex-col pl-[45px] py-[51px] "
              style={{
                width: "348.82px",
                height: "192px",
                backgroundColor: "#FEEED7",
                boxShadow: " 0px 2.87095px 44.4997px rgba(39, 52, 125, 0.05)",
                borderRadius: "11.4838px",
              }}
            >
              <div>
                <p className="text-xl leading-[35px] font-poppins text-[#464255]">
                  {user.customerType === "Buyer"
                    ? "Amount Earned"
                    : "Amount Spent"}
                </p>
                <h2 className="text-[44px] text-[#464255] font-medium leading-[68px] font-mitr">
                  <h2 className="text-[44px] text-[#464255] font-medium leading-[68px] font-mitr">
                    {amountSpent}
                  </h2>
                </h2>
              </div>
            </div>
            <div
              className="gap-2 flex flex-col pl-[45px] py-[51px] relative"
              style={{
                width: "348.82px",
                height: "192px",
                backgroundColor: "#E5E2FF",
                boxShadow: " 0px 2.87095px 44.4997px rgba(39, 52, 125, 0.05)",
                borderRadius: "11.4838px",
              }}
            >
              <div>
                <p className="text-xl leading-[35px] font-poppins text-[#464255]">
                  Amount Saved
                </p>
                <h2 className="text-[44px] text-[#464255] font-medium leading-[68px] font-mitr">
                  <h2 className="text-[44px] text-[#464255] font-medium leading-[68px] font-mitr">
                    {totalDiscount}
                  </h2>
                </h2>
              </div>
            </div>
          </section>

          <section className="mt-6 flex flex-col w-full overflow-y-auto items-center px-6 mx-4">
            <div className="flex justify-between w-full items-center pt-2">
              <div className="flex gap-8 items-center text-lg">
                <p
                  onClick={() => setTransactionType(0)}
                  className={`${
                    transactionType === 0 ? "border-b-4" : ""
                  } font-poppins font-bold text-[#181B24] border-[#7AC93B] rounded-sm leading-[34px] cursor-pointer`}
                >
                  Wallet
                </p>
                <p
                  onClick={() => setTransactionType(1)}
                  className={`${
                    transactionType === 1 ? "border-b-4" : ""
                  } font-poppins font-bold text-[#181B24] border-[#7AC93B] rounded-sm leading-[34px] cursor-pointer`}
                >
                  Bank
                </p>
              </div>
              <div className="flex items-center text-lg mr-6">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Duration
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={dateFilterValue}
                      label="Duration"
                      onChange={(e) => {
                        setDateFilterValue(e.target.value);
                      }}
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                      <MenuItem value={"1D"}>1 Day</MenuItem>
                      <MenuItem value={"1M"}>1 Month</MenuItem>
                      <MenuItem value={"1Y"}>1 Year</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div className="flex w-full overflow-x-auto">
            <TransactionTable
              filterDate={dateFilterValue}
              transactions={
                transactions[transactionType === 0 ? "wallet" : "bank"]
              }
            /></div>
          </section>
        </div>
      </div>

      {openAddMoneyModal && (
        <PayAdd onClose={() => setOpenAddMoneyModal(false)} />
      )}
    </div>
  );
}
