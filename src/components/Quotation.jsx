import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { createRequirement } from "../redux/api";
import { useSelector } from "react-redux";
import { Snackbar } from "@mui/material";
import Fuse from "fuse.js";
import { SUB_CATEGORY } from "../constants/list";
import { PRODUCT_UNIT } from "../constants/product";
import QuantityMenu from "./QuantityMenu";

export default function Quotation() {
  const [unit, setUnit] = useState("ltr");
  const [product, setProduct] = useState("");
  const [searchAutocomplete, setSearchAutocomplete] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [snackMessage, setSnackMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const fuse = useRef();

  useEffect(() => {
    const { gas, liquid, solid } = SUB_CATEGORY;
    fuse.current = new Fuse([...gas, ...liquid, ...solid], {
      keys: ["title", "desc"],
    });
  }, []);

  const handleClear = () => {
    setProduct("");
    setQuantity("");
    setPrice("");
  };

  const handleSubmit = async () => {
    if (!quantity || !price || !product) {
      console.log(quantity);
      setSnackMessage("All Fields are required!");
      return;
    }
    setLoading(true);
    await createRequirement({
      quantity,
      price,
      unit,
      buyerId: user.id,
      open: true,
      productName: product,
    });

    setSnackMessage("Requirent Sended!");
    setLoading(false);
    handleClear();
  };

  return (
    <div className="flex flex-col lg:py-[65px] md:py-[65px] py-[30px] lg:px-[55px] md:px-[55px] px-5 gap-[18px]">
      <h2 className="text-[#294B0E] font-inter font-semibold lg:text-[48px] md:text-[48px] text-[1.75rem] lg:leading-[58px] md:leading-[58px] leading-[40px] tracking-[-0.03em]">
        Request Quotes
      </h2>
      <div
        className="mt-2 bg-[#B2E08D] text-black rounded-[10px] lg:py-8 md:py-8 py-4 lg:px-16 md:px-16 px-5"
        id="product-requirement-form"
      >
        <div className="flex justify-around font-poppins">
          <div className="lg:w-[50%] md:w-[50%] w-full flex flex-col gap-4 items-start justify-center">
            <div className="lg:w-[70%] md:w-[70%] w-full flex flex-col gap-1 mt-2 relative">
              <p className="text-sm font-bold">Product</p>

              <input
                type="text"
                required
                value={product}
                onChange={(e) => {
                  setProduct(e.target.value);
                  if (fuse.current) {
                    const res = fuse.current.search(e.target.value);
                    setSearchAutocomplete(res.slice(0, 10));
                  }
                }}
                className="bg-gray-50 text-black text-sm w-full border px-[21px] py-4 border-gray-300 rounded-[10px] outline-none"
                placeholder="Search for a product"
              />
              {!!searchAutocomplete.length && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded-xl left-0 top-20 px-[8px] py-[10px]  w-[90%]">
                  {searchAutocomplete.map(({ item }, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setProduct(item.title);
                        setSearchAutocomplete([]);
                      }}
                      value={item}
                      className="font-sg text-[14px] leading-[28px] h-[38px] p-[8px] text-[#111B29]  flex items-center justify-start hover:bg-[#e1e1e6] rounded-lg w-full"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="lg:w-[70%] md:w-[70%] w-full flex flex-col gap-1">
              <p className="text-sm font-bold">Quantity</p>
              <div className="flex ">
                <div
                  className="w-[100px] bg-gray-50 pl-6"
                  style={{ borderRadius: "10px 0px 0px 10px" }}
                >
                  <QuantityMenu
                    unit={unit}
                    setUnit={setUnit}
                    units={PRODUCT_UNIT}
                  />
                </div>
                <div className="bg-gray-50 py-[5px] border border-l-2 rounded-r-md lg:w-[300px] md:w-[285px]">
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    className="outline-none h-full text-black bg-gray-50 text-sm w-full px-[21px] py-[9px] rounded-r-[10px] outline-none"
                    placeholder="Quantity"
                  ></input>
                </div>
              </div>
            </div>
            <div className="lg:w-[70%] md:w-[70%] w-full flex flex-col gap-1">
              <p className="text-sm font-bold">Price</p>
              <div>
                <input
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className="py-4 text-black h-full bg-gray-50 text-sm w-full border px-[21px] border-gray-300 rounded-[10px] outline-none"
                  placeholder="Enter Price"
                ></input>
              </div>
            </div>
            <div className="flex flex-col mt-5 gap-3 justify-center items-center md:w-[70%] w-full">
              <div className="flex gap-2 justify-center items-center w-full">
                <input
                  type="checkbox"
                  required
                  className="checked:bg-[#7AC93B] bg-white appearance-none rounded-xl border-[1.5px] border-white-300  w-[17px] h-[17px] outline-none"
                />
                <p className="text-sm">
                  I agree to the{" "}
                  <Link to={"#"} className="text-[#7AC93B] ">
                    Terms & Conditions.
                  </Link>
                </p>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-[#7AC93B] w-[140px] h-[44px] rounded-[10px] text-white font-bold"
              >
                Post Request
              </button>
            </div>
          </div>
          <div className="lg:flex md:flex hidden w-[40%] justify-center items-center">
            <img src="/images/quotation_art.png" className=" w-[90%]" />
          </div>
        </div>
        <Snackbar
          open={Boolean(snackMessage)}
          autoHideDuration={1000}
          onClose={() => setSnackMessage(null)}
          message={snackMessage || ""}
        />
      </div>
    </div>
  );
}
