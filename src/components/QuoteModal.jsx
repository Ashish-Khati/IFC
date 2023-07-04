import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  closeQuotationModal,
  openOrderSuccessModal,
} from "../redux/store/modalSlice";
import { sendRequirement } from "../redux/api";

function QuoteModal() {
  const { isOpen, product } = useSelector(
    (state) => state.modal.quotationModal
  );
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!product) return;
    setProductName(product?.name);
    setUnit(product?.price.unit);
    setPrice(product.price.value);
  }, [product]);

  const HandleChange1 = (event) => {
    setUnit(event.target.value);
  };

  function handleModalClose() {
    dispatch(closeQuotationModal());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = {
      productName,
      quantity,
      price: price,
      unit,
      open: !product,
      productId: product?.id || "",
    };
    await sendRequirement(currentUser.id, product.sellerId, data);
    setLoading(false);
    dispatch(closeQuotationModal());
    dispatch(openOrderSuccessModal());
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form
        className="px-4 h-[500px] bg-white rounded-[10px] flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <p className="text-[2rem] font-bold w-full flex justify-center mt-4">
          Request Quotes
        </p>

        <div className="flex flex-col gap-1 w-full">
          <p className="text-xs font-bold">Product</p>
          <input
            type="text"
            required
            className=" bg-gray-50 text-sm w-full border px-[21px] py-3 border-gray-300 rounded-[10px] outline-none"
            placeholder="Product or Service you are looking for..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold">Quantity</p>
          <div className="flex w-full md:w-[399px]">
            <div className="bg-gray-50 w-[30%]">
              <Select
                sx={{
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  width: "100%",
                }}
                value={unit}
                label="unit"
                onChange={HandleChange1}
              >
                <MenuItem value={"piece"}>Pcs</MenuItem>
                <MenuItem value={"kg"}>kg</MenuItem>
                <MenuItem value={"ltr"}>ltr</MenuItem>
              </Select>
            </div>

            <input
              type="number"
              required
              className=" bg-gray-50 text-sm w-[70%] border px-[21px] py-[17px] border-gray-300 rounded-r-[10px] outline-none"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <p className="text-xs font-bold">Price</p>
          <input
            type="number"
            required
            className="w-full bg-gray-50 w-full text-sm border px-[21px] py-[17px] border-gray-300 rounded-[10px] outline-none"
            placeholder="price you want to buy at"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={10}
          />
        </div>
        <div className="flex gap-1">
          <input
            required
            type="checkbox"
            className="rounded-[10px] appearance-none checked:bg-[#7AC93B]  border-[1.5px] border-gray-300 mt-[2px] ml-[2px] w-[20px] h-[20px] outline-none"
          />
          <p>
            I agree to the{" "}
            <Link to={"#"} className="text-[#7AC93B] ">
              Terms & Conditions.
            </Link>
          </p>
        </div>
        <div className="flex gap-5">
          <button
            className="w-[140px] h-[44px] border-2 border-gray-300 rounded-[10px]"
            onClick={handleModalClose}
          >
            Cancel
          </button>
          <button
            className=" bg-[#7AC93B] w-[140px] h-[44px] rounded-[10px] text-white font-bold"
            type="submit"
          >
            {loading ? "Loading" : "Post Request"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
export default QuoteModal;
