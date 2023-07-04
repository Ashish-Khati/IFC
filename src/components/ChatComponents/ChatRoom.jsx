import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import { ArrowBack } from "@mui/icons-material";
import Input from "./Input";
import {
  doc,
  onSnapshot,
  query,
  where,
  collection,
  orderBy,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { sendMessage } from "../../api/chat";
import { AccountCircle, Tune } from "@mui/icons-material";
import Button from "../UIElements/Button";
import { Modal } from "@mui/material";
import { useRef } from "react";
import {
  acceptRequirement,
  createOrder,
  getRequirement,
  payWithRazorpay,
  updateRequirement,
} from "../../redux/api";
import PaymentPopUp from "../PaymentPopUp";

export default function ChatRoom({ chatId, setShowList }) {
  const [messages, setMessages] = useState([]);
  const [openRequirement, setOpenRequirement] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const { chats } = useSelector((state) => state.chats);

  const activeChat = chats.find((chat) => chat.id === chatId);

  const handleMessageSend = async (text) => {
    sendMessage(chatId, { text, sendBy: currentUser.id });
  };

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "messages", chatId, "message"),
      orderBy("sendAt")
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe;
  }, [chatId]);

  if (!chatId)
    return (
      <div className="grid h-full place-content-center gap-5 text-xl font-semibold">
        no chats yet!
      </div>
    );

  return (
    <>
      <div className="flex gap-4 align-center w-full justify-between border-b-1 px-2 pb-2">
        <div className="flex gap-4 ">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowList(true);
              }}
              className="lg:hidden block"
            >
              <ArrowBack></ArrowBack>
            </button>
            <AccountCircle fontSize="large" sx={{ color: "#a9a9a9" }} />
          </div>
          <div className="flex flex-col">
            <p
              style={{
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              <span className="text-base">
                {
                  activeChat[
                    activeChat?.seller?.id === currentUser.id
                      ? "buyer"
                      : "seller"
                  ]?.fullName
                }
              </span>
            </p>
          </div>
          <Button onClick={() => setOpenRequirement(true)}>Requirement</Button>
        </div>
      </div>
      <Messages messages={messages} />
      <Input onSend={handleMessageSend} />
      <Modal
        open={openRequirement}
        onClose={() => setOpenRequirement(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Requirements requirementId={activeChat.requirementId} />
      </Modal>
    </>
  );
}

const Requirements = ({ requirementId }) => {
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [form, setForm] = useState({
    price: "",
    quantity: { value: "", unit: "" },
    productName: "",
    accepted: false,
  });
  const currentUser = useSelector((state) => state.auth.user);
  const requirement = useRef(null);

  useEffect(() => {
    getRequirement(requirementId).then((res) => {
      setForm(res);
      requirement.current = res;
    });
  }, []);

  const isFormChange = () => {
    if (!requirement.current) return;
    const { quantity, price } = requirement.current;
    if (form.quantity.value !== quantity?.value || form.price !== price) {
      return true;
    }
    return false;
  };

  const handleAccept = async () => {
    setLoading(true);
    await acceptRequirement(requirementId);
    setForm({ ...form, accepted: true });
    setLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const { quantity, price } = form;
    const sendBy = form.sellerId === currentUser.id ? 1 : 0;
    await updateRequirement(requirementId, {
      quantity,
      price,
      sendBy,
    });
    setLoading(false);
    setEditable(false);
    setForm({ ...form, sendBy });
    requirement.current = { ...form, sendBy };
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <h1 className="font-bold text-xl flex justify-center">Requirement</h1>
      <div className="flex flex-col gap-[15px] mt-4">
        <div className="flex flex-row gap-[12px]">
          <div className="flex flex-col">
            <label className="text-sm font-poppins font-medium">
              Quantity ({form.quantity.unit}) :
            </label>
            <input
              disabled={!editable}
              className=" text-[#768396] border-2  border-slate-300  p-2 w-[120px] outline-none rounded-[5px]"
              value={form.quantity.value}
              type="number"
              onChange={(e) => {
                if (!editable) return;
                setForm({
                  ...form,
                  quantity: { ...form.quantity, value: e.target.value },
                });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-poppins font-medium">Price :</label>
            <input
              disabled={!editable}
              type="number"
              className=" text-[#768396] border-2  border-slate-300  p-2 w-[120px] outline-none rounded-[5px]"
              value={form.price}
              onChange={(e) => {
                if (!editable) return;
                setForm({ ...form, price: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col border border-gray-300 rounded-lg p-[5px]">
          <p>Product Name: {` ${form.productName}`}</p>
          <p>Requirement Accepted: {` ${form.accepted ? "Yes" : "No"}`}</p>
        </div>
      </div>

      {!form.accepted ? (
        <div className="flex justify-around gap-[12px] mt-4">
          {!editable ? (
            <button
              className="flex items-center justify-center hover:bg-slate-100 h-[40px] w-[80px] border-1 border-gray-300 rounded-lg shadow-lg"
              onClick={() => setEditable((prev) => !prev)}
            >
              Edit
            </button>
          ) : (
            <button
              disabled={!isFormChange()}
              className="flex items-center justify-center hover:bg-slate-100 h-[40px] w-[80px] border-1 border-gray-300 rounded-lg shadow-lg"
              onClick={handleUpdate}
            >
              {loading ? "Updating..." : "Confirm"}
            </button>
          )}
          {form[form.sendBy === 0 ? "buyerId" : "sellerId"] !==
            currentUser.id && (
            <button
              onClick={handleAccept}
              className="flex items-center justify-center bg-[#2945FF] text-white h-[40px] w-[80px] rounded-lg shadow-lg"
            >
              {loading ? "Updating..." : "Accept"}
            </button>
          )}
        </div>
      ) : (
        form.buyerId === currentUser.id && (
          <button
            className="mt-4 w-full flex items-center justify-center bg-[#2945FF] text-white h-[40px] rounded-lg shadow-lg"
            onClick={() => {
              setOpenPayment(true);
            }}
          >
            Place Order
          </button>
        )
      )}
      <Modal
        open={openPayment}
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 4,
          overflow: "auto",
        }}
        onClose={() => {
          setOpenPayment(false);
        }}
      >
        <PaymentPopUp requirement={form} />
      </Modal>
    </div>
  );
};
