import React, { useMemo } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { PAYMENT_MODES } from "../constants/transaction";
import { useSelector } from "react-redux";

export default function TransactionsCard() {
  const wallet = useSelector((s) => s.wallet);
  const transactions = useMemo(() => {
    if (!wallet.transactions) return [];
    return [...wallet.transactions.bank, ...wallet.transactions.wallet];
  }, [wallet.transactions]);

  return (
    <div
      className="rounded-3xl py-4 px-0.5 border-1 border-gray-300 h-30 w-50 cursor-pointer transition ease-out duration-[400ms] hover:scale-105"
      style={{
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="flex flex-row justify-between px-3 ">
        <h1 className="font-black text-sm ml-6">Transactions</h1>
        <p className="text-[#558D29] text-xs font-extrabold hover:cursor-pointer">
          View all
          <ArrowRightAltIcon style={{ width: "1rem" }} />
        </p>
      </div>
      <div className="pt-2 pb-4  text-xs text-gray-500 font-bold flex flex-row items-center justify-end ">
        <div className="w-20 ">ID</div>
        <p className="w-44">Payment Mode</p>
        <p className="w-28">Amount</p>
        <p className="w-20">Date</p>
        <p className="w-20 pl-2">Time</p>
      </div>
      <div className="h-[160px]">
        {transactions.length ? (
          transactions
            .sort((a, b) =>
              a.createdAt.seconds > b.createdAt.seconds ? 1 : -1
            )
            .slice(0, 3)
            .map(({ createdAt, paymentMode, amount }, index) => {
              return (
                <>
                  <div className="py-1 text-xs text-black font-semibold flex flex-row items-center justify-center transition ease-out duration-[300ms] hover:scale-[1.03]">
                    <div className="w-20">{index + 1}</div>
                    <p className="w-44 font-bold">
                      {PAYMENT_MODES[paymentMode]}
                    </p>
                    <p className="w-28 font-bold">{amount}</p>
                    <p className="w-20 font-bold">
                      {`${new Date(
                        createdAt?.seconds * 1000
                      ).toLocaleDateString()}`}
                    </p>
                    <div className="pl-5 w-24 text-blue-600 hover:cursor-pointer">
                      {`${new Date(
                        createdAt?.seconds * 1000
                      ).toLocaleTimeString()}`}
                    </div>
                  </div>
                  <div className="pr-20 pl-12">
                    <hr className="h-px my-2 bg-gray-300 border-0"></hr>
                  </div>
                </>
              );
            })
        ) : (
          <div className="text-gray-500 text-center">No Transaction</div>
        )}
      </div>
    </div>
  );
}
