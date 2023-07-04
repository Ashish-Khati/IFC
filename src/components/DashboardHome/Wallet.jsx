import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
} from "@react-pdf/renderer";
import { getTransactions } from "../../api/wallet";
import { USER_TYPES } from "../../constants/user";

function Wallet() {
  const { customerType, id, userType } = useSelector(
    (state) => state.auth.user
  );

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const amountSpent = useSelector((state) => state.wallet.amountSpent);

  useEffect(() => {
    dispatch(getTransactions({ userId: id, userType: USER_TYPES[userType] }));
  }, []);

  console.log(user);

  const handleDownloadPdf = () => {
    const MyPDF = (
      <Document>
        <Page>
          <View>
            <Text>Hello, world!</Text>
            <Text>This is a PDF generated from a React component.</Text>
          </View>
        </Page>
      </Document>
    );

    return MyPDF;
  };

  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return (
    <div
      className="w-full h-full flex lg:flex-col flex-row gap-2 items-center justify-center rounded-3xl bg-[#F2FAEB] py-6 px-12 text-center content-center cursor-pointer transform transition ease-out duration-[400ms] hover:scale-[1.07]"
      style={{
        fontFamily: "Poppins",
      }}
    ><div>
      <p className="text-xs font-semibold">
        {customerType === "Seller"
          ? "Your earning this month"
          : "Your expenditure this month"}
      </p>

      <h1 className="font-bold text-3xl py-3">₹ {amountSpent || "00"} </h1>
      <p className="text-xs text-gray-500 font-semibold pb-3">
        {date.toDateString(formattedDate)} at{" "}
        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
      </div>
      <div className="hover:cursor-pointer rounded-3xl flex gap-x-2 border-1 justify-center text-xs text-[#4A7B24] p-5 items-center border-[#4A7B24]">
        <div>
          <span className="relative top-0.5 z-20 text-[#558D29]">
            <SouthRoundedIcon style={{ fontSize: "13px" }} />
          </span>
          <div className="relative bottom-2 bg-[#90ca64] h-2.5 w-4 rounded-sm"></div>
        </div>
        <button className="font-bold text-medium ">
          <div>
            <PDFDownloadLink
              document={handleDownloadPdf()}
              fileName="Receipt.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download Receipt"
              }
            </PDFDownloadLink>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Wallet;
