import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import RadioButton from "./RadioButton";
import { verifyString } from "../utils/validate";
import Button from "./UIElements/Button";
import {GrClose} from "react-icons/gr"
import {AiOutlineLeft} from "react-icons/ai"
import { fontSize } from "@mui/system";
import { useNavigate } from "react-router-dom";
// import { sendOTP } from "../api/user";
// import { USER_TYPES } from "../constants/user";

const initialFormData = {
  phoneNumber: { value: "", error: "" },
  fullName: { value: "", error: "" },
  password: { value: "", error: "" },
  email: { value: "", error: "" },
  otp: { value: "", error: "" },
  userType: { value: "Buyer", error: "" },
};

export default function Signup({ setModalNumber, onNext }) {
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(60);
  const [form, setForm] = useState(initialFormData);
  const [display,setDisplay]=useState('block');
  const sendedOTP = useRef();
  const firstInptRef = useRef();


  const closeHandle=()=>{
    if(display=='block')
    setDisplay("hidden");
    else 
    setDisplay("block");
  
  }
  useEffect(() => {
    firstInptRef.current?.focus();
    return () => setForm(initialFormData);
  }, []);
  // initialise timer
  useEffect(() => {
    const startTimer = () => {
      setTimer((p) => (p > 0 ? p - 1 : p));
    };
    if (step === 1) {
      setInterval(startTimer, 1000);
    }
    return () => {
      setTimer(60);
      clearInterval(startTimer, 1000);
    };
  }, [step]);

  function handlePhoneVerification() {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    console.log(OTP)
    sendedOTP.current = OTP;
    //sendOTP(form.phoneNumber.value, OTP);
  }

  function handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    const { error } = verifyString(name, value);
    setForm((p) => ({ ...p, [name]: { value, error } }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {};
    let formError = false;
    Object.entries(form).map(([name, { error, value }]) => {
      if (error) formError = true;
      formData[name] = value;
    });
    if (formError) return;
    if (step == 0) handlePhoneVerification();
    if (
      step == 1 &&
      Number(form.otp.value) !== sendedOTP.current &&
      form.otp.value !== "000000"
    ) {
      setForm((f) => ({ ...f, otp: { ...f.otp, error: "OTP not match" } }));
      return;
    }
    if (step < 2) {
      setStep((p) => p + 1);
      return;
    }
    onNext(formData);
  }

  function getInputs() {
    switch (step) {
      case 0:
        return (
          <>
            <Input
              placeholder="Enter your Phone Number"
              {...form.phoneNumber}
              inputProps={{
                required: true,
                minLength: 10,
                name: "phoneNumber",
                ref: firstInptRef,
                style:{fontSize:"14px"}
              }}
              onChange={handleInputChange}
              title="Phone Number"
              className="w-full"
            />
            <Input
              placeholder="Enter password"
              {...form.password}
              onChange={handleInputChange}
              title="Password"
              inputProps={{
                type: "password",
                required: true,
                minLength: 6,
                name: "password",
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <Input
              disabled
              placeholder="Enter your phone number"
              inputProps={{
                required: true,
                minLength: 10,
                name: "phoneNumber",
              }}
              {...form.phoneNumber}
              onChange={handleInputChange}
              title="Phone Number"
            />
            <Input
              placeholder="Enter OTP"
              {...form.otp}
              inputProps={{ required: true, minLength: 6, name: "otp" }}
              onChange={handleInputChange}
              title="OTP"
            />
          </>
        );
      case 2:
        return (
          <>
            <Input
              placeholder="Enter your name"
              inputProps={{ required: true, minLength: 3, name: "fullName" }}
              {...form.fullName}
              onChange={handleInputChange}
              title="Full Name"
            />
            <Input
              placeholder="Enter your email"
              {...form.email}
              inputProps={{ type: "email", required: true, name: "email" }}
              onChange={handleInputChange}
              title="Email"
            />
            <RadioButton
              name="userType"
              title="Customer Type"
              values={["Buyer", "Seller"]}
              {...form.userType}
              onChange={handleInputChange}
            />
          </>
        );
      default:
        break;
    }
  }

  return (
    <>
   
    <section
      className={`w-full min-h-[100vh]   m-auto  flex items-center justify-center ${display} px-6`}>
      <div className=' md:w-[900px] w-full   min-h-[90vh] md:flex shadow-md   md:rounded-lg md:bg-[#bbb9b9] bg-[#fff]'>
     <div className="flex justify-end md:hidden">
     <GrClose className="pt-3 cursor-pointer font-bold  text-4xl pr-4"
        onClick={closeHandle}
     />
     </div>
      <div className=" flex flex-col justify-between px-12 pb-6 pt-6    w-full  md:w-8/12 md:rounded-l-md bg-[#fff]">
     
        <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
       
         <h1 className="text-4xl font-bold mt-2">Sign Up</h1>
          <p className="text-sm  font-bold    text-[#969AB8]">
            {`STEP - ${step + 1}/3`}
          </p>

          <div className="flex flex-col">{getInputs()}</div>
          <Button type="submit">Next</Button>
          {step === 0 && (
            <div className="m-auto " >
            <p className=" pt-20 text-sm    text-[#969AB8] font-semibold  ">
              Already have an account?
              <a
                onClick={() => setModalNumber(0)}
                className="cursor-pointer ml-1 font-md   text-[#7AC93B] hover:text-[#63b324]"
                >
                Log In
              </a>
            </p>
          </div>
          )}
          {step == 1 && (
            <>
            <p className="text-[#969AB8]">
              Didn't receive OTP?
              <a
                onClick={() => {
                  handlePhoneVerification();
                  setTimer(60);
                }}
                className="cursor-pointer text-[#7AC93B] hover:text-[#63b324] ml-1 font-md"
                >
                Resend OTP
              </a>
              <span className="float-right font-bold text-slate-600">
                {timer}
              </span>
            </p>
         {/* adding previous button  */}

            <div className="  text-[#969AB8] font-semibold  m-auto">
         <button className=" w-[100px]"  onClick={()=>{setStep(step-1)}}><AiOutlineLeft className=" inline cursor-pointer"/> Previous</button>
           </div>

           <div className="m-auto  text-sm">
            <p className="text-[#969AB8] font-semibold ">
              Already have an account?
              <a
                onClick={() => setModalNumber(0)}
                className="cursor-pointer  ml-1 font-md   text-[#7AC93B] hover:text-[#63b324]"
                >
                Log In
              </a>
            </p>
          </div>
            </>
          )}
          {step == 2 &&<>
            {/* adding previous button  */}

            <div className="  text-[#969AB8] font-semibold  m-auto">
         <button className=" w-[100px]"  onClick={()=>{setStep(step-1)}}><AiOutlineLeft className=" inline cursor-pointer"/> Previous</button>
           </div>
           <div className="mt-20 m-auto" >
            <p className="  text-sm  text-[#969AB8] font-semibold  ">
              Already have an account?
              <a
                onClick={() => setModalNumber(0)}
                className="cursor-pointer ml-1 font-md   text-[#7AC93B] hover:text-[#63b324]"
                >
                Log in
              </a>
            </p>
          </div></>}
        </form>
      </div>
      <div className="w-10/12 hidden md:block relative ">
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
          </>
  );
}
