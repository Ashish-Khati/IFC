import React, { useState} from "react";
import { MenuOpen } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  openAuthModal,
  openFeedbackModal,
  openProductFormModal,
  openProfileChangeModal,
} from "../redux/store/modalSlice";
import { useDispatch } from "react-redux";
import Menu from "../components/UIElements/Menu/Menu";
import Footer from "../components/Footer";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const promises = [
    {
    title: "Eliminate Dead Milege",
    subtitle: "Pellentesque at pellentesque tortor, ut cursus elit. Proin a lorem tristique, lobortis erat et, sagittis mi. Praesent libero      justo, ullamcorper nec pretium id, dignissim sit amet mauris",
  },
  {
    title: "Precise Quality",
    subtitle: "Pellentesque at pellentesque tortor, ut cursus elit. Proin a lorem tristique, lobortis erat et, sagittis mi.",
  },
  {
    title: "Precise Quality",
    subtitle: "Fusce semper fringilla purus non interdum. In aliquet vel augue ultricies hendrerit. Curabitur porttitor accumsan sem eget accumsan.",
  },
  {
      title: "Precise Quality",
    subtitle: "Pellentesque at pellentesque tortor, ut cursus elit. Proin a lorem tristique, lobortis erat et, sagittis mi.",
  },
];
export default function WhoAreWe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const DropDownList = [
    {
      name: "For Buyers ▾",
      list: [
        {
          title: "Post Your Requirement",
          onClick: () => {
            navigate("#product-requirement-form");
          },
        },
        {
          title: "Search Supplier/Products",
          onClick: () => {
            navigate("products");
          },
        },
        { title: "Book FCI Logistics", onClick: () => {}, commingSoon: true },
        { title: "Pay with FuelCab", onClick: () => {}, commingSoon: true },
      ],
    },
    {
      name: "For Sellers ▾",
      list: [
        {
          title: "Sell on FuelCab",
          onClick: () => {
            if (!currentUser) {
              handleLoginClick();
            } else if (currentUser.userType === 0) {
              dispatch(openProfileChangeModal(1));
            } else {
              dispatch(openProductFormModal());
            }
          },
        },
        {
          title: "Search Verified Leads",
          onClick: () => {
            navigate("products");
          },
        },
        {
          title: "My Membership",
          onClick: () => {
            if (!currentUser) {
              handleLoginClick();
            } else {
              navigate("dashboard/setting");
            }
          },
        },
        { title: "Get Freight Quotes", onClick: () => {}, commingSoon: true },
        { title: "Ship with FuelCab", onClick: () => {}, commingSoon: true },
      ],
    },
    {
      name: "Contact ▾",
      list: [
        {
          title: "Call Us: +91-9988909052 ",
          onClick: () => {
            document.location.href = "tel:9988909052";
          },
        },
        {
          title: "Feedback",
          onClick: () => {
            dispatch(openFeedbackModal());
          },
        },
      ],
    },
    {
      name: "Company ",
      list: [
        {
          title: "Who We Are",
          onClick: () => {
            navigate("who-are-we");
          },
        },
        { title: "Blogs", onClick: () => {}, commingSoon: true },
        { title: "Events", onClick: () => {}, commingSoon: true },
        { title: "Media Press", onClick: () => {}, commingSoon: true },
        {
          title: "Our Team",
          onClick: () => {
            navigate("team");
          },
        },
        {
          title: "Our Testimonial",
          onClick: () => {
            navigate("#testimonial");
          },
        },
        {
          title: "Franchise",
          onClick: () => {},
          commingSoon: true,
        },
        {
          title: "Faq’s",
          onClick: () => {
            navigate("faq");
          },
        },
      ],
    },
  ];
  function handleLoginClick() {
    dispatch(openAuthModal());
  }

  const [isOpen, setIsOpen] = useState(false);
  
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <>
        <div className="flex w-full h-[91px] justify-between items-center lg:py-[36px] md:py-[36px] py-[20px] lg:px-20 px-2">
        <div
          className={`lg:hidden absolute top-16 bg-white p-2 rounded-lg left-2 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col items-start justify-start text-[#4A7B24]">
            <Link
              to="/booking"
              className="flex items-center font-inter font-semibold text-[15px] tracking-[-0.03em] h-[41px] hover:border-b-2 border-[#4A7B24]"
            >
              HSD Delivery
            </Link>
            {DropDownList?.map((list, index) => (
              <Menu key={index} item={list} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="lg:hidden block">
            <button
              type="button"
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#4A7B24]"
            >
              <MenuOpen></MenuOpen>
            </button>
          </div>
          <h1>
            <Link className="lg:text-[22px] text-[17px] font-extrabold font-inter text-black">
              Fuelcab India
            </Link>
          </h1>
        </div>
        <div className="lg:flex hidden gap-[18px] items-center text-[#4A7B24]">
          <div className="flex flex-col relative justify-center">
            <Link
              to="/booking"
              className="flex items-center font-inter font-semibold text-[15px] tracking-[-0.03em] h-[41px] hover:border-b-2 border-[#4A7B24]"
            >
              HSD Delivery
            </Link>
          </div>
          {DropDownList?.map((list, index) => (
            <Menu key={index} item={list} />
          ))}
        </div>
        {currentUser ? (
          <div className="flex items-center gap-[20px]">
            <p className="font-inter lg:block md:block hidden font-semibold text-[15px] tracking-[-0.02em] ">
              Hi, {currentUser.fullName}
            </p>
            <Link to="/dashboard">
              <button className="bg-[#7AC93B] w-[120px] text-white h-[41px] rounded-3xl justify-center flex items-center font-inter font-semibold text-[15px] tracking-[-0.03em] hover:scale-105 duration-200">
                Dashboard
              </button>
            </Link>
          </div>
        ) : (
          <Link onClick={handleLoginClick}>
            <button className="bg-[#7AC93B] text-white h-[41px] rounded-3xl px-[24px] flex items-center justify-center font-inter font-semibold text-[15px] tracking-[-0.03em] hover:scale-105 duration-300">
              Login
            </button>
          </Link>
        )}
      </div>
      <div className="bg-[#F2FAEB] w-full overflow-hidden flex lg:flex-row md:flex-row flex-col items-center justify-center lg:h-[490px] md:h-[389px] h-[380px]  lg:px-10 md:px-10 px-3 py-2">
          <div className="lg:w-1/2 md:w-1/2 w-full lg:flex md:flex hidden justify-center items-center">
              <h1 className="font-semibold text-6xl">Who are we?</h1>
          </div>
          <div className="lg:w-1/2 md:w-1/2 w-full flex items-center justify-center gap-2 overflow-hidden lg:h-[442px] md:h-[336px] h-[287px]">
            <div className="w-2/3 flex flex-col gap-2 lg:h-[442px] md:h-[336px] h-[287px]  justify-center overflow-hidden">
              <img alt=""className="w-full lg:h-[200px] md:h-[152px] h-[130px] md:h-[152px] h-[130px]" src="/Images/Rectangle_8.png"></img>
              <div className="flex gap-2 lg:h-[240px] md:h-[182px] h-[155px]  overflow-hidden">
                <img alt=""className="w-2/5 lg:h-[240px] md:h-[182px] h-[155px] " src="/Images/Rectangle_9.png"></img>
                <img alt=""className="w-3/5 lg:h-[240px] md:h-[182px] h-[155px]" src="/Images/Rectangle_11.png"></img>
              </div>
            </div>
            <div className="w-1/3 flex flex-col gap-2 lg:h-[442px] md:h-[336px] h-[287px] justify-center overflow-hidden">
                <img alt=""className="lg:h-[298px] md:h-[226px] h-[193px]" src="/Images/Rectangle_10.png"></img>
                <img alt=""className="lg:h-[142px] md:h-[108px] h-[92px]" src="/Images/Rectangle_12.png"></img>
            </div>
          </div>
          <div className="w-full lg:hidden md:hidden flex justify-center items-center py-3">
              <h1 className="font-semibold text-4xl">Who are we?</h1>
          </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 pt-4 pb-12 px-3">
        <p className="lg:w-1/2 md:w-7/12 w-full">
        <span className="font-bold">FuelCab{" "}</span>is a dolor sit amet, consectetur adipiscing elit. Nam id finibus tellus. Quisque id turpis vitae tortor auctor interdum. Curabitur feugiat egestas lorem id cursus. Nulla facilisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus sodales est id sem ornare lobortis. Sed faucibus consequat eros, vel vulputate tortor venenatis vel. Vestibulum et neque at eros placerat laoreet. Pellentesque et pellentesque lorem. Pellentesque efficitur fringilla rutrum.
        </p>
        <p className="lg:w-1/2 md:w-7/12 w-full">
        Pellentesque at pellentesque tortor, ut cursus elit. Proin a lorem tristique, lobortis erat et, sagittis mi. Praesent libero justo, ullamcorper nec pretium id, dignissim sit amet mauris. Aenean congue lectus ex, eget placerat leo posuere nec. Aenean eu malesuada lectus. Sed convallis ex justo. Fusce semper fringilla purus non interdum. In aliquet vel augue ultricies hendrerit. Curabitur porttitor accumsan sem eget accumsan. Aliquam luctus urna in erat tempus, iaculis elementum orci placerat. Proin pellentesque volutpat sapien et posuere.
        </p>

      </div>
      <div className="bg-[#F2FAEB] w-full overflow-hidden flex lg:flex-row flex-col items-center justify-center lg:h-[677px] md:h-[769px] h-[364px] lg:px-10 md:px-16 px-3 py-2">
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center gap-2 overflow-hidden">
              <div className="flex gap-2 h-[311px] overflow-hidden">
                <img alt=""className="w-5/12 h-[311px]" src="/Images/Rectangle_13.png"></img>
                <img alt=""className="w-7/12 h-[311px]" src="/Images/Rectangle_14.png"></img>
              </div>
            <div className="flex gap-2 h-[311px] justify-center overflow-hidden">
                <img alt=""className="h-[311px] w-4/6" src="/Images/Rectangle_16.png"></img>
                <img alt=""className="h-[311px] w-2/6" src="/Images/Rectangle_15.png"></img>
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:flex hidden justify-center items-center">
              <h1 className="font-semibold text-6xl ">Why FuelCab?</h1>
          </div>
          <div className="w-full lg:hidden flex justify-center items-center py-3">
              <h1 className="font-semibold text-4xl">Why FuelCab?</h1>
          </div>
      </div>
      <div className="flex lg:flex-nowrap md:flex-nowrap flex-wrap w-full justify-center lg:text-left text-center lg:gap-3 lg:px-10 md:px-10 px-1 pt-4 pb-12">
          {
            promises?.map((promises)=>(
              <div className="flex flex-col gap-2 lg:w-1/4 md:w-1/4 w-5/12">
                <h1 className="font-semibold">{promises.title}</h1>
                <p className="lg:text-base md:text-base text-sm">{promises.subtitle}</p>
              </div>
            ))
          }
      </div>
      <div className="bg-[#F2FAEB] w-full overflow-hidden flex lg:flex-row  flex-col items-center justify-center lg:h-[677px] md:h-[769px] h-[364px] lg:px-10 md:px-16 px-3 py-2">
          <div className="w-1/2 lg:flex hidden justify-center items-center">
              <h1 className="font-semibold text-6xl">Our Services</h1>
          </div>
          <div className="lg:w-1/2 w-full flex items-center justify-center gap-2 overflow-hidden">
            <div className="w-2/3 flex flex-col gap-2 lg:h-[624px] md:h-[624px] h-[297px] justify-center overflow-hidden">
              <div className="flex gap-2 lg:h-[412px] md:h-[412px] h-[195px] overflow-hidden">
                <img alt=""className="w-2/3 lg:h-[412px] md:h-[412px] h-[195px]" src="/Images/Rectangle_17.png"></img>
                <img alt=""className="w-1/3 lg:h-[412px] md:h-[412px] h-[195px]" src="/Images/Rectangle_18.png"></img>
              </div>
              <img alt=""className="w-full lg:h-[210px] md:h-[210px] h-[100px]" src="/Images/Rectangle_20.png"></img>
            </div>
            <div className="w-1/3 flex flex-col gap-2 lg:h-[624px] md:h-[624px] h-[295px] justify-center overflow-hidden">
                <img alt=""className="lg:h-[310px] md:h-[310px] h-[146px]" src="/Images/Rectangle_21.png"></img>
                <img alt=""className="lg:h-[311px] md:h-[311px] h-[147px]" src="/Images/Rectangle_19.png"></img>
            </div>
          </div>
          <div className="w-full lg:hidden flex justify-center items-center py-3">
              <h1 className="font-semibold text-4xl">Our Services</h1>
          </div>
      </div>
      <div className="flex lg:flex-nowrap md:flex-nowrap flex-wrap w-full justify-center lg:text-left text-center lg:gap-3 lg:px-10 md:px-10 px-1 pt-4 pb-12">
          {
            promises?.map((promises)=>(
              <div className="flex flex-col gap-2 lg:w-1/4 md:w-1/4 w-5/12">
                <h1 className="font-semibold">{promises.title}</h1>
                <p className="lg:text-base md:text-base text-sm">{promises.subtitle}</p>
              </div>
            ))
          }
      </div>
      <div className="bg-[#F2FAEB] w-full overflow-hidden flex lg:flex-row flex-col items-center justify-center lg:px-10 md:px-16 px-3 py-2">
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center gap-2 lg:h-[677px] md:h-[660px] h-[364px] overflow-hidden">
              <div className="flex gap-2 h-[311px] overflow-hidden">
                <img alt=""className="w-5/12 h-[311px]" src="/Images/Rectangle_13.png"></img>
                <img alt=""className="w-7/12 h-[311px]" src="/Images/Rectangle_14.png"></img>
              </div>
            <div className="flex gap-2 h-[311px] justify-center overflow-hidden">
                <img alt=""className="h-[311px] w-4/6" src="/Images/Rectangle_16.png"></img>
                <img alt=""className="h-[311px] w-2/6" src="/Images/Rectangle_15.png"></img>
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:flex hidden justify-center items-center">
              <h1 className="font-semibold text-6xl ">Our Culture</h1>
          </div>
          <div className="w-full lg:hidden flex justify-center items-center py-3">
              <h1 className="font-semibold text-4xl">Our Culture</h1>
          </div>
      </div>
      <div className="flex lg:flex-nowrap md:flex-nowrap flex-wrap w-full justify-center lg:text-left text-center lg:gap-3 lg:px-10 md:px-10 px-1 py-4">
          {
            promises?.map((promises)=>(
              <div className="flex flex-col gap-2 lg:w-1/4 md:w-1/4 w-5/12">
                <h1 className="font-semibold">{promises.title}</h1>
                <p className="lg:text-base md:text-base text-sm">{promises.subtitle}</p>
              </div>
            ))
          }
      </div>
      <div className="w-full bg-[#F2FAEB] flex lg:flex-row md:flex-row flex-col items-center lg:justify-between md:justify-between justify-center px-10 py-5 mt-6 mb-10">
          <div className="flex flex-col lg:items-start md:items-start items-center lg:gap-4 md:gap-4">
            <h1 className="text-[#294B0E] text-lg font-semibold">Address</h1>
            <div className="text-[#505050] text-sm flex flex-col lg:items-start md:items-start items-center">
              <p className="">11-XYZ Street,</p>
              <p>XYZ Town, XYZ Dist. - 123456</p>
              <p>Abcdefn,</p>
              <p>INDIA.</p>
            </div>
          </div>
          <div className="flex items-center lg:justify-between md:justify-between justify-center flex-col gap-2 lg:items-start md:items-end"> 
            <div className="flex flex-col lg:items-start md:items-start items-center">
              <h1 className="text-[#294B0E] text-lg lg:text-left md:text-right font-semibold">Contact Us</h1>
              <div className="text-[#7AC93B] text-sm lg:pt-3 md:pt-3 ">
                <div className="flex  gap-1"><div><PhoneIcon fontSize="text-lg"/></div><p className="text-[#505050]">212345654545 (Toll Free)</p></div>
                <div className="flex  gap-1"><div><EmailIcon fontSize="text-lg"/></div><p className="text-[#505050]">fuelcab@email.com</p></div>
              </div>
            </div>
            <div className="flex flex-col lg:items-start md:items-start items-center">
            <h1 className="text-[#294B0E] text-lg font-semibold lg:text-left md:text-right">Follow Us on</h1>
            <div className="flex items-center gap-2 text-[#7AC93B]">
              <InstagramIcon/>
              <TwitterIcon/>
              <FacebookIcon/>
              <LinkedInIcon/>
            </div>
          </div>
          </div>
      </div>
      <Footer />
    </>
  );
}
