import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import {GrClose} from "react-icons/gr"
import Input from "./Input";
import { login } from "../api/auth";
import { clearAuthError } from "../redux/store/authSlice";
import { resetAuthModal } from "../redux/store/modalSlice";

export default function Login({ setModalNumber }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [display,setDisplay]=useState('block');
  const { loading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formData;
    dispatch(login({ email, password }));
  }

  useEffect(() => {
    if (user) dispatch(resetAuthModal());
  }, [user]);

  function handleInputChange(e) {
    e.preventDefault();
    if (error) {
      dispatch(clearAuthError());
    }
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  }

  const closeHandle=()=>{
    if(display=='block')
    setDisplay("hidden");
    else 
    setDisplay("block");
  }

  return (
    <section className={`w-full min-h-[80vh] flex items-center justify-center ${display} px-8 `}>
    <div className=' sm:w-[900px]  sm:h-[500px] h-[20vh]  min-h-[90vh] md:flex shadow-md rounded-md  bg-[#fff]'>
   <div className="flex justify-end md:hidden">
   <GrClose className="pt-3 cursor-pointer font-bold  text-4xl pr-4"
      onClick={closeHandle}
   />
   </div>

   <div className=" flex flex-col justify-between px-12 pb-6 pt-6    w-full    md:w-6/12 md:rounded-l-md rounded-md bg-[#fff] "> 
        <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold mt-2 text-slate-600">Log In</h1>
          <p className="font-sm text-[#969AB8] font-semibold">
          Login to get the best deals, exclusive offers with Fuelcab.
          </p>
          <div className="flex flex-col">
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
                type: "password",
                minlength: 6,
                name: "password",
              }}
              title="Password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col justify-start items-center w-full gap-4">
          <button
              type="submit"
              className="w-full font-bold bg-[#7AC93B] text-[#fff] p-2 rounded-md mt-4 flex justify-center items-center"
            >
              {loading && (
                <svg
                  class="w-5 h-5 mr-3 -ml-2 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
             Login
            </button>
          </div>
          {error && <Alert severity="error">{error + "!"}</Alert>}
          <div className=" m-auto mt-16">
          <p className=" text-[#969AB8] font-bold ">
            Don't have an account?
            <a
              onClick={() => setModalNumber(1)}
              className="cursor-pointer  text-[#7AC93B] ml-1 font-md "
            >
              Signup
            </a>
          </p>
          </div>
        </form>
      </div>
      <div className="w-6/12 hidden md:block relative ">
        <img
          src="./Images/Mapsmap.png"
          className="h-full overflow-x-hidden rounded-md"
          alt=""
          />
      {/* close button added here  */}
          <GrClose className="pt-3 cursor-pointer font-bold  text-4xl pr-4 absolute top-0 right-0"
      onClick={closeHandle}/>
      </div>  
      </div>
     
    </section>
  );
}
