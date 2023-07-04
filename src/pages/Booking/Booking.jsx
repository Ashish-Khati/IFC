import React, { useState, useEffect, useRef, useMemo } from "react";
import style from "./Booking.module.css";
import { useLocation } from "react-router-dom";
import DatePicker from "../../components/UIElements/DatePicker";
import { sendRequirement } from "../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { Snackbar } from "@mui/material";
import {
  openAuthModal,
  openOrderSuccessModal,
} from "../../redux/store/modalSlice";
import { getFuelPrice } from "../../api/fuelPrice";
import { getStructuredLocation } from "../../utils/location";
import TrackingMap from "../../components/TrackingMap";

const initialForm = {
  location: { latitude: "", longitude: "", addressLine: "" },
  product: null,
  date: new Date(),
  quantity: "",
};

const DELIVERY_CHARGE = 1000;

export default function Booking() {
  const { state } = useLocation(); // route location
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(null);
  const [fuelPrice, setFuelPrice] = useState(89.0);
  const { userLocation } = useSelector((state) => state.location);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { productsByAdmin } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const inputRef = useRef();

  // set location if given by previous page
  useEffect(() => {
    if (state?.location) {
      setForm({ ...form, ...state });
    } else if (userLocation.address) {
      const { latitude, longitude } = userLocation;
      const { address } = userLocation;
      const addressLine = address.village
        ? `${address.village}, ${address.county}`
        : `${address.county}, ${address.city}`;
      setForm({
        ...form,
        location: {
          addressLine,
          latitude,
          longitude,
          state: address.state,
          city: address.village ? address.village : address.city,
          country: address.country,
          postalCode: address.postcode,
        },
      });
    }
  }, []);

  // select first product
  useEffect(() => {
    if (!productsByAdmin?.length) return;
    setForm((p) => ({ ...p, product: productsByAdmin[0] }));
  }, [productsByAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePlaceChanged = async () => {
    const [place] = inputRef.current.getPlaces();
    const location = getStructuredLocation(place);
    //const price = await getFuelPrice(place.formatted_address);
    setFuelPrice(89.45);
    setForm({ ...form, location });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      dispatch(openAuthModal());
      return;
    }
    if (!form.product) return;

    try {
      setLoading(true);
      const { location, quantity, unit, product, date } = form;
      await sendRequirement(user.id, product.sellerId, {
        price: Number(fuelPrice),
        quantity,
        unit: product.price?.unit || "ltr",
        productId: product.id,
        productName: product.name,
        open: false,
        location,
        bookDate: date,
      });
      dispatch(openOrderSuccessModal());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen md:flex-row flex-col">
      <form
        className="md:w-[35%] h-full w-full flex flex-col gap-[40px] py-[40px] px-[40px]"
        onSubmit={handleSubmit}
      >
        <div className="font-poppins font-semibold text-[41px] text-[#1E1E1E] leading-[57px] w-full flex justify-center ">
          Book Delivery
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col w-full h-[60px] gap-[5px]">
            <div className="font-poppins text-sm leading-[18px] font-semibold text-[#151515] flex">
              Delivery Location
            </div>
            <StandaloneSearchBox
              style={{ border: "10px" }}
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handlePlaceChanged}
            >
              <input
                type="text"
                required
                placeholder="Where you want to deliver?"
                name="location"
                value={form.location.addressLine}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    location: { ...p.location, addressLine: e.target.value },
                  }))
                }
                className="font-sans text-sm text-[#A9A9A9] pt-[11px] pb-[12px] w-full h-[42px] border border-[#D1D1D1] bg-[#F9F9F9] rounded-xl px-[20px] outline-none"
              />
            </StandaloneSearchBox>
          </div>
          <div className="flex gap-[20px]">
            <div className="flex flex-col w-full h-[60px] gap-[5px]">
              <div className="font-poppins text-sm leading-[18px] font-semibold text-[#151515]">
                Fuel Type
              </div>
              <div className="flex gap-[10px]">
                {productsByAdmin.map((product) => {
                  return (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleChange({
                          target: { name: "product", value: product },
                        });
                      }}
                      className={`${
                        form.product?.name === product.name &&
                        "bg-[#7AC93B] text-[white]"
                      } font-sans text-sm text-[#A9A9A9] pt-[11px] pb-[12px] w-full h-[42px] border border-[#D1D1D1]  rounded-xl px-[20px] outline-none`}
                    >
                      {product.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-[20px] items-center">
            <div className="flex flex-col w-full h-[60px] gap-[5px]">
              <div className="font-poppins text-sm leading-[18px] font-semibold text-[#151515]">
                Date
              </div>
              <div className="font-roboto text-sm text-[#151515] outline-none cursor-pointer">
                <DatePicker
                  date={form.date}
                  setDate={(date) =>
                    handleChange({ target: { name: "date", value: date } })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col w-full h-[60px] gap-[5px]">
              <div className="font-poppins text-sm leading-[18px] font-semibold text-[#151515]">
                Quantity
              </div>
              <div className="w-full flex flex-row border-1 pl-[5px] border-[#D1D1D1] rounded-xl bg-[#F9F9F9] items-center">
                <input
                  placeholder="Enter Quantity"
                  type="number"
                  required
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="h-[40px] w-[90%] pl-[5px] outline-none bg-[#F9F9F9] font-sans text-sm text-[#D1D1D1] ml-[2px]"
                />
              </div>
            </div>
          </div>
          <div className="rounded-[10px] bg-[#F2FAEB] py-2">
            {form.location.addressLine && (
              <div className="ml-2 mr-2 shrink-0  flex justify-between">
                <p className="color-[#151515] text-[16px] font-semibold leading-[120%] ">
                  Fuel Price
                </p>
                <p className="">₹{fuelPrice}</p>
              </div>
            )}
            {form.quantity && (
              <div className="m-2 pt-2 shrink-0  flex justify-between">
                <p className="color-[#151515] text-[16px] font-semibold leading-[120%] ">
                  Total
                </p>
                <p className="">₹{Number(fuelPrice) * Number(form.quantity)}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-[56px] bg-[#7AC93B] rounded-xl font-poppins text-[#FFFFFF] font-bold items-center justify-center"
          >
            {loading ? "Loading..." : user ? "Book" : "Login/Sigup"}
          </button>
        </div>
      </form>

      <div className="md:w-[65%] w-full md:block hidden">
        {useMemo(() => {
          const { latitude, longitude } = form.location;
          const pos = latitude
            ? { lat: latitude, lng: longitude }
            : {
                lat: 20.5937,
                lng: 78.9629,
              };
          return <TrackingMap markerPos={pos} />;
        }, [form.location])}
      </div>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={1000}
        onClose={() => setError(null)}
        message={error}
        action={() => setError(null)}
      />
    </div>
  );
}
