import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { payWithRazorpay } from "../../redux/api";
import { updateWalletAmount } from "../../redux/store/authSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function PayAdd({ onClose }) {
  const { currentUser } = useSelector((s) => s.user);
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  async function updateWallet() {
    await updateDoc(doc(db, "users", currentUser.uid), {
      walletAmount: Number(currentUser.walletAmount) + Number(amount),
    });
    dispatch(
      updateWalletAmount(Number(currentUser.walletAmount) + Number(amount))
    );
  }

  const checkoutRazorpay = () => {
    if (!amount) return;
    payWithRazorpay(
      { amount, name: currentUser.name, description: "" },
      updateWallet
    );
  };

  return (
    <div className="w-screen z-50 h-screen fixed left-0 top-0 bg-neutral-500 bg-opacity-60 ">
      <section className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center bg-gray-100 p-32 gap-6 relative rounded-md">
          <h1 className="text-xl">Add Money</h1>
          <input
            className="w-60 rounded-md p-2 border-2"
            placeholder="Enter The Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="bg-[#5932EA] p-2 text-white rounded-md w-60 "
            type="submit"
            onClick={() => checkoutRazorpay()}
          >
            <p className="text">Add Money</p>
          </button>
          <button
            className="absolute top-[10px] left-[10px] hover:rotate-90 hover:scale-110 transition-all delay-100 cursor-pointer"
            onClick={onClose}
          >
            <GrClose />
          </button>
        </div>
      </section>
    </div>
  );
}
