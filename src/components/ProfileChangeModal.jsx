import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeProfileChangeModal } from "../redux/store/modalSlice";
import { useEffect, useState } from "react";
import { setUserProfile } from "../redux/api";
import { setUserType } from "../redux/store/authSlice";

export default function ProfileChangeModal() {
  const { isOpen, profile } = useSelector(
    (state) => state.modal.profileChangeModal
  );
  const { user } = useSelector((state) => state.auth);
  const [selectedProfile, setSelectedProfile] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) return;
    setSelectedProfile(profile);
  }, [profile]);

  async function handleConfirm() {
    await setUserProfile(user.id, selectedProfile);
    dispatch(setUserType(selectedProfile));
    dispatch(closeProfileChangeModal());
  }

  return (
    <Modal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={isOpen}
      onClose={() => {
        dispatch(closeProfileChangeModal());
      }}
    >
      <div className="h-[100px] bg-white">
        <p>Change Profile</p>
        <button
          onClick={() => setSelectedProfile(0)}
          className={`${selectedProfile === 0 ? "text-red-700" : ""}`}
        >
          Buyer
        </button>
        <button
          onClick={() => setSelectedProfile(1)}
          className={`${selectedProfile === 1 ? "text-red-700" : ""}`}
        >
          Seller
        </button>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </Modal>
  );
}
