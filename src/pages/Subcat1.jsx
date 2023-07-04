import React from "react";
import { useParams,useSearchParams} from "react-router-dom";
import { useState,useEffect } from "react";
export default function Sub(){
  const [category,setcategory] = useState('solid');
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const category = searchParams.get('category');
    setcategory( category);
  }, [searchParams]);
const obj= {
  'solid':["Animal Tallow","Chicken Tallow","Palm Stearin","PP/HDPE Waste","LDP/MHW","Tyre Waste","Saw Dust","Wood Chips","Rise Husk","Coffee Husk","Ground Nut Cell","Soya Husk","Carbon Black","Bio-Mass Pallets","Starch Based Raw Materials","RDF (Refuse Derived Fuel)","Biomass Briquettes Bio Coal","Other Bio Mass"],
  'liquid':["High Speed Diesel","Bio Diesel (B-100)","LDO","Bio-LDO","Furnace Oil ","Base Oil","Bitumen","UCO","MTO","MTO Cut","MHO","Bio-Ethanol","Bio-Furnace Oil","Bio- Fuel Additives","Acid Oil","Other Vegetable Oil","Bio-Lubricants","Lubricants","New Bitumen"],
  'gaseous':["Bio-CNG/CBG","CNG","LNG","Green Hydrogen"]
}
    return (
      <div className="lg:py-[80px] lg:px-[80px] px-[30px]">
      <div className="text-3xl font-bold text-slate-600">
        Explore by <p>Category</p>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text pt-[40px]">
         {
           obj[category].map((item)=>(
            <div >
              <div className="hover:bg-white p-[25px] w-fit lg:w-[250px] rounded-lg hover:shadow-2xl hover:shadow-blue-500/30">
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
                  {/* <img src="/Images/High-speed Diesel.png" alt="" /> */}
                </div>
      
                <div className="text-xl font-bold text-slate-600 py-4">
                  {item}
                </div>
                <div className=" text-slate-500">
                  Here has to be short <p>description of this course.</p>{" "}
                </div>
                <div className="text-sky-500 flex pt-[20px] justify-end">
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
            </div>  
            ))
         }
        </div>
        </div>
    )
}