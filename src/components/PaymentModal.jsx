import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import PaymentPopUp from "./PaymentPopUp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "1px solid #F9F9F9",
  boxShadow: 10,
  display: "block",
  height: "100%",
};

export default function PaymentModal({ value }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <PaymentPopUp />
        </Box>
      </Modal>
    </div>
  );
}
