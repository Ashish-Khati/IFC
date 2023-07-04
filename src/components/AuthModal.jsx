import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import SubCategorySelector from "./SubCategorySelector";
import { useSelector, useDispatch } from "react-redux";
import {
  changeAuthModalNumber,
  resetAuthModal,
} from "../redux/store/modalSlice";
import { clearAuthError } from "../redux/store/authSlice";

const initialRegdata = {
  phoneNumber: "",
  fullName: "",
  email: "",
  userType: "",
  password: "",
  interestedProducts: { solid: [], liquid: [], gas: [] },
  walletAmount: 0,
};

export default function AuthModal() {
  const [regData, setRegData] = useState(initialRegdata);
  const {
    authModal: { isOpen, modalNumber },
  } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  function setModalNumber(modalNumber) {
    dispatch(changeAuthModalNumber({ modalNumber }));
  }

  function handleModalClose() {
    dispatch(resetAuthModal());
  }

  function handleFormChange(formData) {
    setRegData((p) => ({ ...p, ...formData }));
    setModalNumber(2);
  }

  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={isOpen}
      onClose={handleModalClose}
    >
      {modalNumber === 0 ? (
        <Login setModalNumber={setModalNumber} />
      ) : modalNumber === 1 ? (
        <Signup onNext={handleFormChange} setModalNumber={setModalNumber} />
      ) : (
        <SubCategorySelector
          formData={regData}
          onChange={setRegData}
          onClose={handleModalClose}
        />
      )}
    </Modal>
  );
}
