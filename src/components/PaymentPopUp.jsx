import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createOrder, getProduct, payWithRazorpay } from "../redux/api";
import { useMemo } from "react";

const OrderCard = ({ product, requirement: { price, quantity } }) => {
  return (
    <div className="flex flex-row justify-center h-[170px] gap-[16px] border-b border-[#F9F9F9]">
      <div className="flex flex-col w-[320px]">
        <div className="flex flex-col w-full h-[93px] gap-[8px]">
          <div className="flex flex-col w-full h-[69px] gap-[4px]">
            <span className="font-poppins font-medium text-[15px] text-[#151515] leading-[22px]">
              {product?.name}
            </span>
            <div className="flex flex-col w-full h-[42px] gap-[4px]">
              <div className="flex flex-row w-full gap-[14px]">
                <div className="w-[60px] font-sans text-xs text-[#A9A9A9]">
                  Location:
                </div>
                <div className="font-sans text-xs text-[#151515]">
                  {`${product?.location?.addressLine}, ${product?.location.city}`}
                </div>
              </div>
              <div className="flex flex-row w-full gap-[14px]">
                <div className="w-[60px] font-sans text-xs text-[#A9A9A9]">
                  Stock:
                </div>
                <div className="font-sans text-xs text-[#151515]">
                  {product?.inStock ? "In Stock" : "Not In Stock"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[45px] flex flex-row items-center justify-between">
          <div className="flex flex-col w-[91px]">
            <div className="font-poppins font-semibold text-[18px] leading-[27px] text-[#558D29]">
              {price} ₹
            </div>
          </div>
          <div className="w-[92px] h-[32px] p-[6px] flex flex-row border-[1px] border-[#D1D1D1] rounded-xl bg-[#F9F9F9] items-center">
            <p className="h-[19px] w-[30px] outline-none text-gray-400 font-sans text-sm text-[#D1D1D1] ml-[2px]">
              {quantity?.value}
            </p>
            {"|"}
            <p className="ml-2 outline-none bg-[#F9F9F9] font-sans text-sm text-gray-400 ">
              {quantity?.unit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const initialvalues = {
  fullName: "",
  phoneNumber: "",
  addressLine: "",
  city: "",
  state: "",
  postalCode: "",
};

const PaymentPopUp = ({ requirement }) => {
  const [form, setForm] = useState(initialvalues);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const subTotal = useMemo(() => {
    return Number(requirement?.quantity?.value) * Number(requirement.price);
  }, [requirement]);

  useEffect(() => {
    if (!requirement) return;
    getProduct(requirement.productId).then((product) => {
      setProduct(product);
    });
  }, [requirement]);

  useEffect(() => {
    if (!requirement?.location?.addressLine) return;
    const { addressLine, city, state, postalCode } = requirement.location;
    setForm({ ...form, addressLine, city, state, postalCode });
  }, [requirement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);
    const total = subTotal + 1000;
    payWithRazorpay(
      {
        amount: total,
        name: user.fullName,
        description: requirement.id,
      },
      async ({ razorpay_payment_id }) => {
        const { buyerId, sellerId, quantity } = requirement;
        const { addressLine, city, state, postalCode } = form;
        const destination = { addressLine, city, state, postalCode };
        await createOrder({
          total,
          paymentId: razorpay_payment_id,
          buyerId,
          sellerId,
          destination,
          origin: product.location,
          productId: product.id,
          quantity,
          requirementId: requirement.id,
        });
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-fit m-auto px-[45px] py-[16px] gap-[32px] bg-white rounded-md"
    >
      <div className="flex lg:flex-row md:flex-row flex-col h-full gap-[32px]">
        <div className="flex flex-col  gap-[32px]">
          <div className="flex flex-col w-full gap-[32px]">
            <div className="flex flex-col w-full h-[53px] gap-[4px]">
              <div className="font-poppins font-semibold text-2xl text-[#151515]">
                Billing info
              </div>
              <div className="font-sans text-xs text-[#A9A9A9]">
                Please enter your billing info
              </div>
            </div>
            <div className="flex lg:flex-row flex-col w-full  gap-[32px]">
              <div className="flex flex-col w-[319px] h-full gap-[32px]">
                <div className="flex flex-col w-full h-[60px]">
                  <div className="font-poppins text-xs leading-[18px] font-semibold text-[#151515]">
                    Full name
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="font-sans text-sm text-[#A9A9A9] pt-[11px] pb-[12px] w-full h-[42px] border border-[#D1D1D1] bg-[#F9F9F9] rounded-xl px-[20px] outline-none"
                  />
                </div>
                <div className="flex flex-col w-full h-[60px]">
                  <div className="font-poppins text-xs leading-[18px] font-semibold text-[#151515]">
                    Address
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter address"
                    name="addressLine"
                    value={form.addressLine}
                    onChange={handleChange}
                    className="font-sans text-sm text-[#A9A9A9] pt-[11px] pb-[12px] w-full h-[42px] border border-[#D1D1D1] bg-[#F9F9F9] rounded-xl px-[20px] outline-none"
                  />
                </div>
                <div className="flex flex-col w-full h-[60px]">
                  <div className="font-poppins text-xs leading-[18px] font-semibold text-[#151515]">
                    State
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="font-sans text-sm text-[#A9A9A9] pt-[11px] pb-[12px] w-full h-[42px] border border-[#D1D1D1] bg-[#F9F9F9] rounded-xl px-[20px] outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col w-[319px] h-full gap-[32px]">
                <div className="flex flex-col w-full h-[60px]">
                  <div className="font-poppins text-xs leading-[18px] font-semibold text-[#151515]">
                    Phone number
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter phone number"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="font-sans text-sm text-[#A9A9A9] pt-[11px] pb-[12px] w-full h-[42px] border border-[#D1D1D1] bg-[#F9F9F9] rounded-xl px-[20px] outline-none"
                  />
                </div>
                <div className="flex flex-col w-full h-[60px]">
                  <div className="font-poppins text-xs leading-[18px] font-semibold text-[#151515]">
                    City
                  </div>
                  <input
                    type="text"
                    placeholder="Enter City"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="font-sans text-sm text-[#A9A9A9] pt-[11px] pb-[12px] w-full h-[42px] border border-[#D1D1D1] bg-[#F9F9F9] rounded-xl px-[20px] outline-none"
                  />
                </div>
                <div className="flex flex-col w-full h-[60px]">
                  <div className="font-poppins text-xs leading-[18px] font-semibold text-[#151515]">
                    ZIP / Postal code
                  </div>
                  <input
                    type="text"
                    placeholder="Enter ZIP / Postal code"
                    name="postalCode"
                    required
                    value={form.postalCode}
                    onChange={handleChange}
                    className="font-sans text-sm text-[#A9A9A9] pt-[11px] pb-[12px] w-full h-[42px] border border-[#D1D1D1] bg-[#F9F9F9] rounded-xl px-[20px] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex md:flex hidden flex-col w-full h-[273px] gap-[32px]">
            <div className="flex flex-col w-full h-[53px] gap-[4px]">
              <div className="font-poppins font-semibold text-2xl text-[#151515]">
                Confirmation
              </div>
              <div className="font-sans text-xs text-[#A9A9A9]">
                We are getting to end, few clicks and your order is ready
              </div>
            </div>
            <div className="flex flex-col  h-[100] gap-[16px] items-center">
              <label className="flex flex-row w-full gap-[8px] px-[16px] py-[9px] border border-[#D1D1D1] bg-[#F9F9F9] rounded-xl ">
                <input
                  type="checkbox"
                  id="T&C"
                  required
                  className="w-[20px] h-[20px] cursor-pointer"
                />
                <span className="font-sans text-sm text-[#151515]">
                  I agree with our terms and conditions and privacy policy.
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-[218px] h-[56px] bg-[#7AC93B] rounded-xl font-poppins text-[#FFFFFF] font-bold items-center justify-center "
            >
              {loading ? "Loading..." : "Pay"}
            </button>
          </div>
        </div>
        <div className="h-full px-[16px] py-[32px] border border-[#D1D1D1] rounded-xl">
          <div className="flex flex-col w-full h-full gap-[40px]">
            <div className="flex flex-col w-full h-[53px] gap-[4px]">
              <div className="font-poppins font-semibold text-2xl text-[#151515]">
                Order summary
              </div>
              <div className="font-sans text-xs text-[#A9A9A9]">
                Price can change depending on shipping method and taxes of your
                state.
              </div>
            </div>
            <div className="flex flex-col w-full gap-[32px]  ">
              <OrderCard product={product} requirement={requirement} />
            </div>
            <div className="flex flex-col w-full h-[152px] gap-[32px]">
              <div className="flex flex-col gap-[12px] w-full h-[78px] ">
                <div className="flex flex-row items-center justify-between w-full h-[18px]">
                  <span className="font-poppins font-semibold text-xs text-[#151515]">
                    Subtotal
                  </span>
                  <span className="font-poppins font-semibold text-xs text-[#151515]">
                    {subTotal}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between w-full h-[18px]">
                  <span className="font-poppins font-semibold text-xs text-[#151515]">
                    Tax
                  </span>
                  <span className="font-poppins font-semibold text-xs text-[#151515]">
                    0
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between w-full h-[18px]">
                  <span className="font-poppins font-semibold text-xs text-[#151515]">
                    Shipping
                  </span>
                  <span className="font-poppins font-semibold text-xs text-[#151515]">
                    1000
                  </span>
                </div>
              </div>
              <div className="flex flex-row w-full h-[42px] px-[14px] justify-between items-center bg-[#F9F9F9] border border-[#D1D1D1] rounded-xl ">
                <input
                  type="text"
                  placeholder="Apply promo code"
                  className="outline-none font-sans text-sm text-[#A9A9A9] pb-[2px] bg-transparent"
                />
                <button className="font-poppins font-bold text-[15px] leading-[22px] text-[#151515]">
                  Apply now
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full h-[39px]">
              <div className="flex flex-col">
                <span className="font-poppins text-xs font-semibold text-[#151515]">
                  Total order
                </span>
                {/* <span className="font-sans text-xs  text-[#558D29]">
                  Guaranteed delivery day: June 12, 2020
                </span> */}
              </div>
              <div className="font-poppins text-[26px] leading-[39px] font-semibold text-[#558D29]">
                {subTotal + 1000} ₹
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden md:hidden flex flex-col w-full h-[273px] gap-[32px]">
        <div className="flex flex-col w-full h-[53px] gap-[4px]">
          <div className="font-poppins font-semibold text-2xl text-[#151515]">
            Confirmation
          </div>
          <div className="font-sans text-xs text-[#A9A9A9]">
            We are getting to end, few clicks and your order is ready
          </div>
        </div>
        <div className="flex flex-col w-full h-[100] gap-[16px] items-center">
          <label className="flex flex-row w-full gap-[8px] px-[16px] py-[9px] border border-[#D1D1D1] bg-[#F9F9F9] rounded-xl ">
            <input
              type="checkbox"
              id="T&C"
              className="w-[20px] h-[20px] cursor-pointer"
            />
            <span className="font-sans text-sm text-[#151515]">
              I agree with our terms and conditions and privacy policy.
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="w-[218px] h-[56px] bg-[#7AC93B] rounded-xl font-poppins text-[#FFFFFF] font-bold items-center justify-center "
        >
          {loading ? "Loading..." : "Pay"}
        </button>
      </div>
    </form>
  );
};

export default PaymentPopUp;
