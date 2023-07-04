import React, { useEffect, useState } from "react";
import { Alert, Modal } from "@mui/material";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { closeFeedbackModal } from "../redux/store/modalSlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function FeedbackForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const {
    feedbackModal: { isOpen },
  } = useSelector((state) => state.modal);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((d) => ({
        fullName: user.fullName,
        email: user.email,
        message: "",
      }));
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    const { fullName, email, message } = formData;

    if (!fullName || !email || !message) {
      setError("Please fill in all fields");
      return;
    }

    await addDoc(collection(db, "feedback"), {
      fullName,
      email,
      message,
    });

    if (user) {
      setFormData((d) => ({ ...d, message: "" }));
    } else {
      setFormData({ fullName: "", email: "", message: "" });
    }
    setSuccess(true);
  }

  function handleInputChange(e) {
    e.preventDefault();
    if (error) {
      setError(null);
    }
    const { fullName, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [fullName]: value }));
  }

  function handleClose(e) {
    dispatch(closeFeedbackModal());
  }

  return (
    <Modal
      open={isOpen}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClose={handleClose}
    >
      <section
        className="flex bg-white rounded-md md:w-1/2 w-full m-10"
        style={{ height: "80vh" }}
      >
        <div className="w-full flex flex-col justify-between px-12 pb-16 pt-6">
          <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold mt-2 text-slate-600">Feedback</h1>
            <p className="font-medium">
              We'd love to hear your feedback! Please provide your name, email,
              and message below.
            </p>
            <div className="flex flex-col w-2/3">
              <Input
                title="Name"
                inputProps={{ required: true, type: "text", name: "fullName" }}
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
              <Input
                title="Email"
                inputProps={{ required: true, type: "email", name: "email" }}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
              <Input
                inputProps={{
                  required: true,
                  type: "text",
                  name: "message",
                }}
                title="Message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message"
                multiline
                rows={6}
              />
            </div>
            <div className="flex flex-col justify-start items-center w-min gap-4">
              <button
                type="submit"
                className="w-full font-bold bg-blue-600 text-white p-2 rounded-md mt-4 flex justify-center items-center whitespace-nowrap px-4"
              >
                Submit Feedback
              </button>
            </div>
            {error && <Alert severity="error">{error}</Alert>}
            {success && (
              <Alert severity="success">Feedback submitted successfully!</Alert>
            )}
          </form>
        </div>
      </section>
    </Modal>
  );
}
