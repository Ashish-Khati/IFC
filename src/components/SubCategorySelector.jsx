import React, { useEffect, useState } from "react";
import { register } from "../api/auth";
import RadioButton from "./RadioButton";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import {GrClose} from "react-icons/gr"
import { closeAuthModal } from "../redux/store/modalSlice";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; 

const subCategoryList = {
  solid: [
    "Animal Tallow",
    "Chicken Tallow",
    "Palm Stearin",
    "PP/HDPE Waste",
    "LDP/MHW",
    "Tyre Waste",
    "Saw Dust",
    "Wood Chips",
    "Rise Husk",
    "Coffee Husk",
    "Ground Nut Cell",
    "Soya Husk",
    "Carbon Black",
    "Bio-Mass Pallets",
    "Starch Based Raw Materials",
    "RDF (Refuse Derived Fuel)",
    "Biomass Briquettes/Bio Coal",
    "Other Bio Mass",
  ],
  liquid: [
    "High Speed Diesel",
    "Bio Diesel (B-100)",
    "LDO",
    "Bio-LDO",
    "Furnace Oil ",
    "Base Oil",
    "Bitumen",
    "UCO",
    "MTO",
    "MTO Cut",
    "MHO",
    "Bio-Ethanol",
    "Bio-Furnace Oil",
    "Bio- Fuel Additives",
    "Acid Oil",
    "Other Vegetable Oil",
    "Bio-Lubricants",
    "Lubricants",
    "New Bitumen",
  ],
  gas: ["Bio-CNG/CBG", "CNG", "LNG", "Green Hydrogen"],
};

export default function SubCategorySelector({ formData, onChange, onClose }) {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const [category, setCategory] = useState("Solid");
  const { error, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [display,setDisplay]=useState('block');
  
  const closeHandle=()=>{
    if(display=='block')
    setDisplay("hidden");
    else 
    setDisplay("block");
  
  }
  function handleCardClick(subCat) {
    let newIntProducts =
      formData.interestedProducts[category.toLocaleLowerCase()];
    if (
      formData.interestedProducts[category.toLocaleLowerCase()].includes(subCat)
    ) {
      newIntProducts = newIntProducts.filter((item) => {
        return item !== subCat;
      });
      onChange((p) => ({
        ...p,
        interestedProducts: {
          ...p.interestedProducts,
          [category.toLocaleLowerCase()]: newIntProducts,
        },
      }));
    } else {
      newIntProducts.push(subCat);
      onChange((p) => ({
        ...p,
        interestedProducts: {
          ...p.interestedProducts,
          [category.toLocaleLowerCase()]: newIntProducts,
        },
      }));
    }
  }

  useEffect(() => {
    if (!user) return;
    dispatch(closeAuthModal());
  }, [loading, user]);

  async function handleSignUp() {
    dispatch(register(formData));
  }

  return (
    <section
    className={`w-full min-h-[100vh]   m-auto  flex items-center justify-center  px-6 ${display}`}>
       <div className=' md:w-[900px] w-full  md:min-h-[90vh]  md:flex shadow-md    bg-[#fff]'>
        <Snackbar
        security="error"
        open={error}
        autoHideDuration={2000}
        message={`${error}`}
      />
        <div className=" px-12 pb-6 pt-6    w-full    rounded-md bg-[#fff] min-h[80vh]">
          <div className=" flex justify-end">
          <GrClose className=" cursor-pointer font-bold   text-3xl"
        onClick={closeHandle}
     />
          </div>
        <h1 className="text-4xl font-bold mt-2">Sign Up</h1>
          <p className="text-sm  font-bold mt-2 mb-6 text-[#969AB8]">
            {`STEP - 4/4`}
          </p>
      <div className="flex justify-between items-center pr-6">
        <span>
          <h1 className="text-3xl font-bold ">
            Interested Products
          </h1>
          <p className="text-[#969AB8] font-bold">
            Get recommandation based on the selected products.
          </p>
        </span>
     
      </div>
      <RadioButton
        title="Category"
        values={["Solid", "liquid", "Gas"]}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {/* <p className="mt-2 font-poppins text-sm leading-[18px] font-semibold text-[#151515] tracking-[.05em]">
        Sub Category
      </p> */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text p-4 h-3/5 overflow-x-hidden overflow-y-scroll hide-scroll"> */}
        {/* {subCategoryList[category.toLocaleLowerCase()].map((item) => (
          <div
            key={item}
            onClick={() => handleCardClick(item)}
            className={`${
              formData.interestedProducts[
                category.toLocaleLowerCase()
              ].includes(item)
                ? " bg-white"
                : "hover:bg-[#91e154]"
            } hover:scale-105 transition-all h-[250px] relative duration-300 cursor-pointer p-[25px] w-fit rounded-lg hover:shadow-2xl hover:shadow-blue-500/30`}
          >
            <div className="text-purple-500 w-10 rounded-lg p-2 h-fit bg-purple-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <div className="text-xl font-bold text-slate-600 py-4">{item}</div>
            <div className=" text-slate-500">
              Here has to be short <p>description of this course.</p>{" "}
            </div>
            <div className="text-sky-500 flex pt-[20px] justify-end absolute bottom-5 right-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        ))} */}
      {/* </div> */}
      

      {/* *********************************************************** */}
      <Carousel responsive={responsive}
    className="mx-5 "
    swipeable={true}
    draggable={true}
    showDots={false}
    ssr={true} // means to render carousel on server-side.
    infinite={true}
    autoPlaySpeed={1000}
    keyBoardControl={false}
    customTransition="all .5"
    transitionDuration={500}
    containerClass="carousel-container"
    >
           {subCategoryList[category.toLocaleLowerCase()].map((item) => (
          <div
            key={item}
            onClick={() => handleCardClick(item)}
            className={`${
              formData.interestedProducts[
                category.toLocaleLowerCase()
              ].includes(item)
                ? " bg-white"
                : "hover:bg-[#C8E9AF]"
            } hover:scale-105 transition-all h-[250px] relative duration-300 cursor-pointer p-[25px] w-fit rounded-lg hover:shadow-2xl hover:shadow-blue-500/30`}
          >
            {/* for round image  */}
             <div className='rounded-full  w-full  justify-center flex'>
             <img src="https://e7.pngegg.com/pngimages/77/99/png-clipart-fuel-oil-tank-truck-transport-truck-freight-transport-truck.png" alt="" className=" w-20 h-20 rounded-full bg-[#D9D9D9]"/>
            </div>

            <div className="text-xl font-bold text-slate-600 py-4">{item}</div>
            <div className=" text-slate-500">
              Here has to be short <p>description of this course.</p>{" "}
            </div>
            <div className="text-sky-500 flex pt-[20px] justify-end absolute bottom-2 right-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        ))}
    </Carousel>
            


      {/* *********************************************************** */}
     {/* <div className="border border-black"> */}
     <button
            onClick={handleSignUp}
            className="sm:w-[40%] w-full font-bold bg-[#7AC93B] text-[#fff] p-2 rounded-md mt-4 flex justify-center items-center"
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
            Next
          </button>
 

      </div>
      </div>
    </section>
  );
}
